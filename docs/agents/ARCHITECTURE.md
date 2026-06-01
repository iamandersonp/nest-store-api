# Arquitectura Hexagonal

## Estructura de carpetas

```text
src/
├── common/                      # Shared kernel
│   ├── domain/
│   │   ├── interfaces/
│   │   │   ├── base-crud.interface.ts   # Contrato genérico CRUD
│   │   │   └── env-config.ts            # Tipado de variables de entorno
│   │   └── ports/                       # Puertos cross-cutting
│   │       ├── email.port.ts            # Envío de emails
│   │       ├── logger.port.ts           # Logging
│   │       └── metrics.port.ts          # Métricas
│   └── infrastructure/
│       └── adapters/                    # Implementaciones dummy
│           ├── email-dummy.service.ts
│           ├── logger.service.ts
│           └── metrics-dummy.service.ts
│
├── products/                    # Módulo de dominio
│   ├── application/             # Casos de uso (lógica de negocio)
│   │   ├── brand-use-case.service.ts
│   │   ├── category-use-case.service.ts
│   │   └── product-use-case.service.ts
│   ├── domain/                  # Núcleo puro
│   │   ├── models/              # Entidades de dominio (interfaces TS)
│   │   └── ports/               # Tokens DI (Symbol) + contratos
│   ├── infrastructure/
│   │   └── adapters/in/v1/      # Adaptadores de entrada versionados
│   │       ├── controllers/
│   │       ├── dtos/
│   │       └── services/        # Implementación de los puertos
│   └── products.module.ts       # Cableado DI del módulo
│
├── users/                       # Mismo patrón que products
│
├── app.module.ts
└── main.ts                      # Bootstrap, ValidationPipe global, Swagger, versioning
test/                            # Tests e2e
docs/<module>/<feature>.md       # Especificación OpenSpec por feature
```

## Path aliases (`tsconfig.json`)

- `@common/*` → `src/common/*`
- `@products/*` → `src/products/*`
- `@users/*` → `src/users/*`

## Flujo de una request

```text
HTTP ──▶ Controller ──▶ UseCaseService ──▶ Port (Symbol) ──▶ Service Adapter
        (infrastructure)  (application)    (domain)         (infrastructure)
```

## Reglas de arquitectura

1. **`domain/`** es TypeScript puro. No importa nada de NestJS ni de adaptadores.
2. **`application/`** depende **únicamente** de `domain/` (entidades + puertos) y de DTOs de entrada.
3. **`infrastructure/`** implementa los puertos y expone adaptadores HTTP. Puede importar `domain/` y DTOs propios.
4. Los **puertos** se declaran como `InjectionToken` (`Symbol`) y se inyectan con `@Inject(TOKEN)`.
5. El **module** cablea `provide: TOKEN, useClass: ServiceImpl` y exporta los use-cases si otros módulos los necesitan.

## Ejemplo canónico

```ts
// src/products/products.module.ts
@Module({
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [
    ProductUseCaseService,
    { provide: PRODUCTS_SERVICE_PORT, useClass: ProductsService },
    // ...
  ],
  exports: [ProductUseCaseService /* ... */],
})
export class ProductsModule {}
```

## Contrato base reutilizable

```ts
// src/common/domain/interfaces/base-crud.interface.ts
export interface BaseCrudService<T, C extends object, U extends object> {
  findAll(): T[] | Promise<T[]>;
  findOne(id: number): T | Promise<T>;
  create(payload: C): T | Promise<T>;
  update(id: number, payload: U): T | Promise<T>;
  delete(id: number): void | Promise<void>;
}
```
