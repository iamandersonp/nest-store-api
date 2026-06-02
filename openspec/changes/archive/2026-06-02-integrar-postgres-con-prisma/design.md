# Design: Integrate PostgreSQL with Prisma ORM

## Technical Approach

Parallel v2 API layer at `infrastructure/adapters/in/v2/` with PostgreSQL via Prisma alongside untouched v1 (in-memory). Commands replace DTOs in the application layer so the use cases are DTO-agnostic. Existing use cases and v1 services are updated to accept Commands; v2 gets its own use cases + Prisma service bound to new port tokens.

## Architecture Decisions

| Decision | Choice | Alternatives | Rationale |
|---|---|---|---|
| v2 parallelism | Separate controllers, use cases, and port tokens | Shared use cases with provider overrides | NestJS DI singleton model prevents rebinding per-route; explicit duplication is clearer |
| ORM | Prisma | TypeORM, Drizzle, Kysely | Type-safe, declarative schema, mature migration pipeline, fits NestJS ecosystem (no decorator coupling) |
| Port contract | `T[] \| Promise<T[]>` stays dual | Force async-only | v1 stays synchronous; v2 is async — dual return keeps the interface compatible without a breaking change |
| Command classes | `readonly` props + `Object.assign(this, props)` | Interface, type alias | Class instantiation provides `instanceof` checks, works with DI and testing; pattern is explicit and traceable |
| PrismaService | Singleton provider with `onModuleInit`/`onModuleDestroy` | Module-scoped, `@Global()` | Singleton ensures one DB connection; lifecycle hooks handle connect/disconnect cleanly |
| v2 port tokens | New Symbols (`PRODUCTS_PRISMA_PORT`, etc.) | Reuse v1 tokens | v1 and v2 coexist — different tokens prevent DI conflicts |

## Flow

```
HTTP ──→ V2Controller ──→ V2Mapper (DTO→Command) ──→ V2UseCase#execute(command)
                                                          │
                ┌──────────────────────────────────────────┘
                ▼
     Port (PRODUCTS_PRISMA_PORT)
                │
                ▼
     ProductsPrismaService ──→ PrismaService ──→ PostgreSQL
```

## File Changes

### New files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | PostgreSQL 16 container (port 5432) |
| `prisma/schema.prisma` | Product, Brand, Category models + relations |
| `prisma/seed.ts` | Seed from existing hardcoded data |
| `src/products/application/commands/create-product.command.ts` | Immutable command class |
| `src/products/application/commands/update-product.command.ts` | Immutable command class |
| `src/products/application/commands/create-brand.command.ts` | Immutable command class |
| `src/products/application/commands/update-brand.command.ts` | Immutable command class |
| `src/products/application/commands/create-category.command.ts` | Immutable command class |
| `src/products/application/commands/update-category.command.ts` | Immutable command class |
| `src/products/infrastructure/prisma/prisma.service.ts` | PrismaClient singleton |
| `src/products/infrastructure/adapters/out/prisma/products-prisma.service.ts` | Prisma-backed CRUD for Product |
| `src/products/infrastructure/adapters/out/prisma/brands-prisma.service.ts` | Prisma-backed CRUD for Brand |
| `src/products/infrastructure/adapters/out/prisma/categories-prisma.service.ts` | Prisma-backed CRUD for Category |
| `src/products/infrastructure/adapters/in/v2/controllers/products-v2.controller.ts` | V2 products endpoints |
| `src/products/infrastructure/adapters/in/v2/controllers/brands-v2.controller.ts` | V2 brands endpoints |
| `src/products/infrastructure/adapters/in/v2/controllers/categories-v2.controller.ts` | V2 categories endpoints |
| `src/products/infrastructure/adapters/in/v2/dtos/products-v2.dto.ts` | Same validation as v1 DTOs |
| `src/products/infrastructure/adapters/in/v2/dtos/brands-v2.dto.ts` | Same validation as v1 DTOs |
| `src/products/infrastructure/adapters/in/v2/dtos/categories-v2.dto.ts` | Same validation as v1 DTOs |
| `src/products/infrastructure/adapters/in/v2/mappers/product-v2.mapper.ts` | DTO → Command |
| `src/products/infrastructure/adapters/in/v2/mappers/brand-v2.mapper.ts` | DTO → Command |
| `src/products/infrastructure/adapters/in/v2/mappers/category-v2.mapper.ts` | DTO → Command |
| `src/products/application/create-product-v2.use-case.ts` | V2 use case (injects `PRODUCTS_PRISMA_PORT`) |
| `src/products/application/find-all-products-v2.use-case.ts` | V2 use case |
| `src/products/application/find-one-product-v2.use-case.ts` | V2 use case |
| `src/products/application/update-product-v2.use-case.ts` | V2 use case |
| `src/products/application/delete-product-v2.use-case.ts` | V2 use case |
| `src/products/application/create-brand-v2.use-case.ts` | V2 use case |
| `src/products/application/find-all-brands-v2.use-case.ts` | V2 use case |
| `src/products/application/find-one-brand-v2.use-case.ts` | V2 use case |
| `src/products/application/update-brand-v2.use-case.ts` | V2 use case |
| `src/products/application/delete-brand-v2.use-case.ts` | V2 use case |
| `src/products/application/create-category-v2.use-case.ts` | V2 use case |
| `src/products/application/find-all-categories-v2.use-case.ts` | V2 use case |
| `src/products/application/find-one-category-v2.use-case.ts` | V2 use case |
| `src/products/application/update-category-v2.use-case.ts` | V2 use case |
| `src/products/application/delete-category-v2.use-case.ts` | V2 use case |

### Modified files

| File | Change |
|------|--------|
| `package.json` | Add `@prisma/client` & `prisma` deps; `branches: 97` → `80` (mínimo 80%, con tope de 90% por política del proyecto) |
| `.env` | Add `DATABASE_URL="postgresql://nest:nest@localhost:5432/nest_store"` |
| `common/domain/interfaces/env-config.ts` | Add `DATABASE_URL: string` |
| `products/products.module.ts` | Register v2 controllers, v2 use cases, PrismaService, Prisma adapters + new port tokens |
| All 15 v1 use case `.ts` files | Parameter type: DTO → Command; import from `commands/` |
| All 15 v1 use case `.spec.ts` files | Wrap payload with `new Command(dto)` |
| All v1 mappers (3 files) | Return type: domain object → Command |

## Prisma Schema

```prisma
model Brand {
  id       Int       @id @default(autoincrement())
  name     String
  image    String
  products Product[]
}

model Category {
  id       Int       @id @default(autoincrement())
  name     String
  products Product[]
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String
  price       Float
  stock       Int
  image       String
  brandId     Int
  categoryId  Int
  brand       Brand    @relation(fields: [brandId], references: [id])
  category    Category @relation(fields: [categoryId], references: [id])
}
```

## Command Pattern

```typescript
// src/products/application/commands/create-product.command.ts
export class CreateProductCommand {
  readonly name!: string;
  readonly description!: string;
  readonly price!: number;
  readonly stock!: number;
  readonly image!: string;
  readonly brandId!: number;
  readonly categoryId!: number;

  constructor(props: CreateProductCommand) {
    Object.assign(this, props);
  }
}
```

Mapper chain: DTO (class-validator decorated) → mapper `fromCreateDto(dto)` → `new CreateProductCommand({...dto})` → use case.

## DI Wiring (`products.module.ts`)

- v1 stays: existing controllers, use cases, `PRODUCTS_SERVICE_PORT` → `ProductsService`
- v2 adds: `PRODUCTS_PRISMA_PORT` → `ProductsPrismaService`, `BRANDS_PRISMA_PORT` → `BrandsPrismaService`, `CATEGORIES_PRISMA_PORT` → `CategoriesPrismaService`
- v2 controllers + v2 use cases registered as providers
- `PrismaService` registered as singleton provider

## Testing Strategy

| Layer | What | How |
|---|---|---|
| Unit (use cases) | Command wrapping + delegation | Tests wrap payload with `new Command(dto)`, same mock-based approach |
| Unit (mappers) | DTO → Command mapping | New `product-v2.mapper.spec.ts`, etc. |
| Integration (Prisma repos) | PrismaService with mocked `$prismaClient` | Mock `prisma.product.create/findMany/...` return values; verify correct Prisma methods called |
| Existing v1 tests | All 15 spec files updated | `execute(dto)` → `execute(new Command(dto))` |

## Migration / Rollout

1. `docker compose up -d` to start PostgreSQL
2. `npx prisma migrate dev --name init` to create tables
3. `npx prisma db seed` to populate from existing hardcoded data
4. Run seed via `prisma/seed.ts` that inserts Product/Brand/Category from in-memory defaults
5. Rollback: `docker compose down -v` + `git checkout -- src/` removes all v2 artifacts

## Open Questions

- [ ] Should existing v1 mappers return Commands or stay returning domain objects? (Decision: update to Commands for consistency — v1 use cases now accept Commands)
- [ ] Should v2 DTOs be reused from v1 or duplicated? (Decision: duplicate for version isolation)
