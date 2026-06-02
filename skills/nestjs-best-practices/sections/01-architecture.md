# Hexagonal Architecture & Modules

## Layer Structure (REQUIRED)

Every feature module follows this layout:

```text
src/<module>/
├── domain/
│   ├── models/              # Entity interfaces — pure TS, NO NestJS imports
│   ├── ports/               # InjectionToken + contract interface
│   └── errors/              # Domain error classes (extends Error)
├── application/             # Use-cases — one class per operation
│   ├── create-<entity>.use-case.ts
│   ├── find-all-<entity>.use-case.ts
│   ├── find-one-<entity>.use-case.ts
│   ├── update-<entity>.use-case.ts
│   └── delete-<entity>.use-case.ts
├── infrastructure/
│   └── adapters/in/v1/
│       ├── controllers/
│       ├── dtos/
│       ├── mappers/
│       └── services/        # Implementations of domain ports
└── <module>.module.ts       # DI wiring
```

## Layer Dependency Rules

| Layer             | May import from                                  | MUST NOT import from                               |
| ----------------- | ------------------------------------------------ | -------------------------------------------------- |
| `domain/`         | — (pure TS)                                      | NestJS, `application/`, `infrastructure/`          |
| `application/`    | `domain/`                                        | NestJS (`@nestjs/common`, etc.), `infrastructure/` |
| `infrastructure/` | `domain/`, `application/`, NestJS, external libs | —                                                  |

**Why:** The domain layer is the innermost ring — zero framework dependencies. Application orchestrates. Infrastructure plugs in adapters. This keeps business logic testable without NestJS.

## Circular Dependency Prevention

- A module must NOT import itself
- Two modules must NOT import each other (A → B → A)
- Use `forwardRef()` only as a LAST resort when circular refs are unavoidable
- Prefer restructuring: extract shared logic into a common module that both import

**✅ Pattern:** `ProductsModule` imports nothing circular. Shared types live in `common/domain/`.

## Module Declaration (REQUIRED)

```typescript
@Module({
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [
    // 1. Per-operation use-cases
    CreateProductUseCase,
    FindAllProductsUseCase,
    FindOneProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,

    // 2. Port → Implementation mapping
    { provide: PRODUCTS_SERVICE_PORT, useClass: ProductsService },
    { provide: BRANDS_SERVICE_PORT, useClass: BrandsService },
  ],
  exports: [
    // Use-cases needed by other modules
    CreateProductUseCase,
    FindAllProductsUseCase,
    FindOneProductUseCase,
  ],
})
export class ProductsModule {}
```

**Rules:**

- Register EACH use-case individually — no monolithic services
- Map ports via `{ provide: TOKEN, useClass: Impl }` — never bind the concrete class directly
- Export use-cases, NOT the port or the implementation

## Feature Module Scope

Each feature module is a **self-contained unit**:

- Owns its domain models, ports, use-cases, and adapters
- Exposes only what other modules genuinely need (via `exports`)
- AppModule is the composition root — imports feature modules, registers cross-cutting providers

## Cross-Cutting Modules

Shared/providers live in `common/` and are registered at `AppModule` level:

```typescript
// AppModule
@Module({
  imports: [ProductsModule, UsersModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    { provide: LOGGER_PORT, useClass: ConsoleLoggerService },
    { provide: EMAIL_PORT, useClass: DummyEmailService },
    { provide: METRICS_PORT, useClass: MetricsDummyService },
  ],
})
export class AppModule {}
```

**Rule:** Do NOT export the same provider from multiple modules — it creates ambiguous bindings.

## Module Re-export Pattern

When a feature module needs access to another module's exports, prefer:

```typescript
@Module({
  imports: [ForwardedModule], // Pull in what you need
  exports: [ForwardedModule], // Re-export so consumers don't re-import
})
export class MyModule {}
```

This is used sparingly — most modules in this project are independent.
