# Proposal: Integrate PostgreSQL with Prisma ORM

## Intent

Agregar persistencia con PostgreSQL via Prisma ORM para el módulo Products (products, brands, categories) bajo una nueva versión `v2` de la API, sin modificar la infraestructura `v1` existente (in-memory). La API actual en `/v1` sigue intacta; `/v2` expone los mismos endpoints pero con PostgreSQL.

## Scope

### In Scope
- `docker-compose.yml` con PostgreSQL 16
- Prisma CLI + `@prisma/client`
- `prisma/schema.prisma` con modelos Product, Brand, Category
- `DATABASE_URL` en `.env` / `EnvConfig`
- `PrismaService` (singleton, `onModuleInit`/`onModuleDestroy`)
- **Nueva capa** `infrastructure/adapters/in/v2/`:
  - `controllers/` — ProductsV2Controller, BrandsV2Controller, CategoriesV2Controller
  - `dtos/` — CreateXxxDto, UpdateXxxDto (reutilizan `class-validator`)
  - `mappers/` — ProductMapper, BrandMapper, CategoryMapper (Prisma → response DTO)
  - `services/` — ProductsPrismaService, BrandsPrismaService, CategoriesPrismaService (implementan `BaseCrudService` con Prisma)
- **Commands** en `application/commands/` — clases puras inmutables con `readonly` props y constructor (`CreateProductCommand`, `UpdateProductCommand`, etc.). Los use cases existentes reciben commands, no DTOs HTTP.
- Nuevos casos de uso donde se requiera lógica v2 específica
- Coverage threshold: branches 97% → 80% (mínimo 80%, tope 90% por política del proyecto)
- Tests:
  - Unit para mappers v2
  - Integration para servicios Prisma (mock PrismaClient)
  - **Corregir todos los tests existentes** que inyecten DTOs a use cases — usar `new Command(dto)` en su lugar
  - Tests de controllers v2

### Out of Scope
- Users, Customers, Orders modules (futuros cambios SDD)
- Remover adaptadores in-memory v1 (siguen funcionando)
- CI/CD con PostgreSQL
- Deprecación de v1

## Capabilities

### New Capabilities
- `/v2/products`, `/v2/brands`, `/v2/categories` — mismos endpoints que v1 pero con persistencia PostgreSQL via Prisma.

### Modified Capabilities
None — `/v1` no se toca.

## Approach

La infraestructura `v1` actual (in-memory) se congela. Se crea `v2` como una implementación paralela completa.

**Flujo v2**:
```
HTTP → V2Controller → Mapper (DTO → Command) → UseCase#execute(Command) → Port (Symbol) → PrismaService → PostgreSQL
```

Los **Commands** son clases puras e inmutables en `application/commands/`. El use case recibe un Command, no un DTO HTTP. El mapper en el controller convierte el DTO validado a Command antes de llamar al use case.

Estructura resultante:
```
src/products/
├── application/
│   ├── commands/                  # ← nuevo: clases command inmutables
│   │   ├── create-product.command.ts
│   │   ├── update-product.command.ts
│   │   └── ...
│   ├── create-product.use-case.ts # ← recibe CreateProductCommand, no DTO
│   └── ...
├── domain/                        # ← intacto
├── infrastructure/adapters/in/
│   ├── v1/                        # ← intacto, in-memory
│   │   ├── controllers/
│   │   ├── dtos/
│   │   ├── mappers/
│   │   └── services/
│   └── v2/                        # ← nuevo, PostgreSQL + Prisma
│       ├── controllers/
│       ├── dtos/
│       ├── mappers/
│       └── services/
└── products.module.ts
```

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `docker-compose.yml` | New | PostgreSQL 16 |
| `prisma/schema.prisma` | New | Product, Brand, Category models |
| `src/products/application/commands/` | New | CreateProductCommand, UpdateProductCommand, etc. |
| `src/**/in/v2/` | New | Controllers + DTOs + mappers + services |
| `src/products/application/*.use-case.ts` | Modified | Parámetro cambia de DTO a Command |
| `src/products/products.module.ts` | Modified | Registra controladores y servicios v2 |
| `package.json` | Modified | Prisma deps + coverage threshold |
| `.env` / `EnvConfig` | Modified | DATABASE_URL |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Coverage below threshold | Med | Lower to 90%; validate with test:cov |
| Command/DTO drift | Low | Commands definen contrato estable; DTOs pueden variar por versión |
| Mapper field mismatch | Low | Unit test every mapping |
| Use case signature change | Med | Commands son parámetro único — tests se actualizan a `new Command(dto)` en el mismo cambio |
| Tests existentes rotos por cambio de firma | Med | Incluido en scope: todos los `.spec.ts` que llaman use cases se actualizan junto con la firma |

## Rollback Plan

1. `git checkout main` — full revert
2. O eliminar `v2/` controllers y services del module — v1 sigue funcionando igual

## Dependencies

- Docker Engine + docker-compose (dev)
- Prisma CLI (`npx prisma`)

## Success Criteria

- [ ] `npm test` passes (existing tests unaffected)
- [ ] `npm run test:cov` shows branches ≥ 90%
- [ ] Prisma generates clean migration for Product, Brand, Category
- [ ] `GET /v2/products` returns same shape as `GET /v1/products`
- [ ] `POST /v2/products` persists to PostgreSQL (verify via psql)
- [ ] `GET /v1/products` still works unchanged
