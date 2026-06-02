# Per-Operation Use Cases

## Single Responsibility Per Use-Case (REQUIRED)

```typescript
// ✅ ONE class per operation, single execute() method
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

// ❌ NEVER: monolithic CRUD service injected everywhere
// ❌ NEVER: one service with 15 methods doing different things
```

**Why:** Per-operation use-cases give you:

- **Testability** — test exactly one thing, one mock setup
- **Single Responsibility** — each class has one reason to change
- **Explicit dependencies** — the constructor reveals exactly what this operation needs
- **Composability** — controllers pick exactly what they need

## execute() Convention

- Every use-case has exactly ONE public method: `execute()`
- Parameters and return type vary per use-case
- `execute()` may be sync or return a Promise — whichever the implementation needs
- No overloads, no optional params on `execute()` — if different, it's a different use-case

## What Goes in a Use-Case (REQUIRED)

A use-case DO:

- Orchestrate domain operations
- Call one or more ports
- Return transformed results
- Apply business rules that span multiple entities

A use-case DOES NOT:

- Import from NestJS (except `@Injectable` and `@Inject`)
- Throw NestJS HTTP exceptions → throw **domain errors** (see error-handling section)
- Access the network, filesystem, or database directly
- Contain controller logic, DTO validation, or HTTP concerns

## Business Logic Location

```
                  ┌──────────────────────┐
                  │   Controller         │ ← HTTP concerns only
                  │   (delegates to UC)  │
                  └────────┬─────────────┘
                           │
                  ┌────────▼─────────────┐
                  │   Use Case           │ ← orchestration, business rules
                  │   (calls ports)      │
                  └────────┬─────────────┘
                           │
                  ┌────────▼─────────────┐
                  │   Domain Port        │ ← contract (interface)
                  └────────┬─────────────┘
                           │
                  ┌────────▼─────────────┐
                  │   Infrastructure     │ ← implementation (DB, API, etc.)
                  └──────────────────────┘
```

**Key rule:** Business logic that involves decision-making belongs in the use-case or domain model, NEVER in the controller or infrastructure adapter.

## Error Handling in Use-Cases

```typescript
@Injectable()
export class FindOneProductUseCase {
  constructor(
    @Inject(PRODUCTS_SERVICE_PORT)
    private readonly service: BaseCrudService<Product, any, any>,
  ) {}

  execute(id: number): Product {
    const product = this.service.findOne(id);
    if (!product) {
      throw new ProductNotFoundError(id); // ✅ domain error
    }
    return product;
  }
}
```

**Rule:** Use-cases throw **domain errors** (custom Error subclasses). They NEVER throw NestJS HTTP exceptions. Mapping to HTTP happens in the controller.
