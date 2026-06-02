# Dependency Injection — Port/Adapter Pattern

## Port Token Declaration (REQUIRED)

```typescript
// domain/ports/product.port.ts
import { InjectionToken } from '@nestjs/common';

export const PRODUCTS_SERVICE_PORT: InjectionToken = Symbol('PRODUCTS_SERVICE_PORT');

// contract interface (optional — use when the port needs typed behavior)
export interface ProductsRepositoryPort {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
}
```

**Rules:**

- Token name in `SCREAMING_SNAKE_CASE` with `_PORT` suffix
- Use `Symbol()` for the token value — guaranteed unique, no string collisions
- Type the token as `InjectionToken` (from `@nestjs/common`)
- Interface is optional — some ports just need a token for simple provider mapping

## Injection in Use-Cases (REQUIRED)

```typescript
@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCTS_SERVICE_PORT)
    private readonly service: BaseCrudService<Product, CreateProductsDto, any>,
  ) {}

  execute(payload: CreateProductsDto): Product | Promise<Product> {
    return this.service.create(payload);
  }
}
```

**Rules:**

- Inject via `@Inject(TOKEN)` — NEVER by class reference
- Use `@Injectable()` on every provider (use-cases, services)
- Constructor injection ONLY — no `@Inject()` on properties

## Provider Scopes (REQUIRED)

Default scope is `DEFAULT` (singleton) for ALL providers:

```typescript
@Injectable()                    // ✅ DEFAULT singleton — correct for stateless use-cases
@Injectable({ scope: Scope.REQUEST })   // ❌ Only if you NEED request-scoped (state per request)
```

**Project rule:** All use-cases, services, and ports use `DEFAULT` scope. No request-scoped providers unless explicitly justified.

## Mocking in Tests (REQUIRED)

Mock the **token**, not the class:

```typescript
const module: TestingModule = await Test.createTestingModule({
  providers: [
    CreateProductUseCase,
    { provide: PRODUCTS_SERVICE_PORT, useValue: mock }, // ✅ token-based mock
  ],
}).compile();
```

**Why:** The production code injects by token. Tests must substitute at the same injection point.

## Interface Segregation (ISP)

- Port interfaces should be **role-specific**, not generic CRUD monsters
- A "reader" port and a "writer" port are better than one "everything" port
- The consumer (use-case) dictates the interface shape, not the implementation

**✅ Example:**

```typescript
// Separate read / write concerns
export const PRODUCT_READER_PORT = Symbol('PRODUCT_READER_PORT');
export const PRODUCT_WRITER_PORT = Symbol('PRODUCT_WRITER_PORT');
```

This project currently uses `BaseCrudService` — refactor to segregated ports when complexity grows.

## Service Locator Anti-Pattern

❌ NEVER do this:

```typescript
// Service Locator — hides dependencies, impossible to test
export class SomeService {
  execute() {
    const productService = app.get(ProductsService); // ❌
    const logger = app.get(LOGGER_PORT); // ❌
  }
}
```

✅ Constructor injection always:

```typescript
export class SomeService {
  constructor(
    @Inject(PRODUCTS_SERVICE_PORT)
    private readonly productService: BaseCrudService<Product, any, any>,
    @Inject(LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}
}
```
