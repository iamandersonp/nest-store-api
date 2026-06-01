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
│   │   ├── create-product.use-case.ts
│   │   ├── find-all-products.use-case.ts
│   │   ├── find-one-product.use-case.ts
│   │   ├── update-product.use-case.ts
│   │   ├── delete-product.use-case.ts
│   │   ├── create-brand.use-case.ts
│   │   ├── find-all-brands.use-case.ts
│   │   ├── find-one-brand.use-case.ts
│   │   ├── update-brand.use-case.ts
│   │   ├── delete-brand.use-case.ts
│   │   ├── create-category.use-case.ts
│   │   ├── find-all-categories.use-case.ts
│   │   ├── find-one-category.use-case.ts
│   │   ├── update-category.use-case.ts
│   │   └── delete-category.use-case.ts
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
HTTP ──▶ Controller ──▶ UseCase#execute() ──▶ Port (Symbol) ──▶ Service Adapter
        (infrastructure)  (application)       (domain)         (infrastructure)
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
    // 15 casos de uso, uno por operación
    CreateProductUseCase,
    FindAllProductsUseCase,
    FindOneProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    // ... 10 más para brands + categories
    { provide: PRODUCTS_SERVICE_PORT, useClass: ProductsService },
    // ...
  ],
  exports: [CreateProductUseCase, FindAllProductsUseCase, /* ... */],
})
export class ProductsModule {}
```

## Patrón de casos de uso

Cada caso de uso es una **clase individual con un único método `execute()`**.
Un controlador inyecta varios casos de uso en lugar de un servicio monolítico.

```ts
// src/products/application/create-product.use-case.ts
@Injectable()
export class CreateProductUseCase {
  constructor(@Inject(PRODUCTS_SERVICE_PORT) private readonly repo: ProductsServicePort) {}

  async execute(payload: CreateProductDto): Promise<Product> {
    return this.repo.create(payload);
  }
}
```

### Contrato base para adaptadores

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
