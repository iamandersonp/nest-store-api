# Tasks: Integrate PostgreSQL with Prisma ORM

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~1800-2000 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 → PR 2 → PR 3 → PR 4 |
| Delivery strategy | ask-on-risk |
| Chain strategy | feature-branch-chain |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Foundation — Commands + Prisma infra | PR 1 | base = main; ~350 lines; schema, deps, Commands, PrismaService, port tokens, module skeleton |
| 2 | v1 refactor — adopt Commands | PR 2 | base = main; ~150 lines; mechanical DTO→Command in 15 use cases + 3 mappers |
| 3 | v2 backend — Prisma services + use cases | PR 3 | base = main; ~500 lines; 3 Prisma adapters + 15 v2 use cases + tests |
| 4 | v2 frontend — Controllers, DTOs, Mappers + wiring | PR 4 | base = main; ~400 lines; HTTP layer + final module wiring + e2e/integration tests |

## Phase 1: Infrastructure & Commands (PR 1)

- [x] 1.1 Create `docker-compose.yml` with PostgreSQL 16 image
- [x] 1.2 Create `prisma/schema.prisma` (Brand, Category, Product models + relations)
- [x] 1.3 Add `DATABASE_URL` to `.env` and `EnvConfig`
- [x] 1.4 Add `@prisma/client` + `prisma` deps to `package.json`; set `branches: 80`
- [x] 1.5 Create 6 Command classes in `src/products/application/commands/`
- [x] 1.6 Create `PRISMA_SERVICE_PORT` + `PRODUCTS_PRISMA_PORT` + `BRANDS_PRISMA_PORT` + `CATEGORIES_PRISMA_PORT` tokens
- [x] 1.7 Create `PrismaService` in `infrastructure/prisma/prisma.service.ts` with `onModuleInit`/`onModuleDestroy`
- [x] 1.8 Register `PrismaService` + new port tokens in `products.module.ts`
- [x] 1.9 Write + pass tests: Command specs, PrismaService spec

## Phase 2: v1 Command Adoption (PR 2)

- [x] 2.1 Update 6 v1 use cases: import Commands, change `execute` parameter from DTO to Command
- [x] 2.2 Update 6 v1 use case specs: wrap payload with `new Command(dto)`
- [x] 2.3 Update 3 v1 mappers: return Commands instead of raw domain objects
- [x] 2.4 Update 3 v1 mapper specs: expect Command output, update assertions
- [x] 2.5 Run `npm test` — all pass

## Phase 3: v2 Backend — Services & Use Cases (PR 3)

### PR 3a — Prisma Adapters (this slice)

- [x] 3.1 Create `ProductsPrismaAdapter` implementing `BaseCrudService<Product, CreateProductCommand, UpdateProductCommand>` (at `src/products/infrastructure/prisma/adapters/products-prisma.adapter.ts`)
- [x] 3.2 Create `BrandsPrismaAdapter` implementing `BaseCrudService<Brand, CreateBrandCommand, UpdateBrandCommand>` (at `src/products/infrastructure/prisma/adapters/brands-prisma.adapter.ts`)
- [x] 3.3 Create `CategoriesPrismaAdapter` implementing `BaseCrudService<Category, CreateCategoryCommand, UpdateCategoryCommand>` (at `src/products/infrastructure/prisma/adapters/categories-prisma.adapter.ts`)
- [x] 3.4 Write Prisma adapter tests (mock PrismaClient methods) — completed with TDD: 30 tests across 3 spec files
- [x] 3.4b Register Prisma adapters in `products.module.ts` using port tokens + export port tokens

### Remaining for PR 3b

- [x] 3.5 Create 15 v2 use cases (Products: 5, Brands: 5, Categories: 5), inject Prisma port tokens
- [x] 3.6 Write v2 use case specs (mock Prisma adapters, test delegation)
- [x] 3.7b Register v2 use cases in `products.module.ts`

## Phase 4: v2 HTTP Layer + Wiring (PR 4)

- [x] 4.1 Create 3 v2 DTO files in `infrastructure/adapters/in/v2/dtos/` (same validation as v1)
- [x] 4.2 Create 3 v2 mappers in `infrastructure/adapters/in/v2/mappers/` (DTO → Command)
- [x] 4.3 Write v2 mapper specs
- [x] 4.4 Create 3 v2 controllers in `infrastructure/adapters/in/v2/controllers/` (CRUD endpoints under `/v2/`)
- [x] 4.5 Register v2 controllers in `products.module.ts` + final DI wiring
- [x] 4.6 Write integration/e2e tests for v2 endpoints
- [x] 4.7 Run `npm run test:cov` — verify branches ≥ 80%
