# Design: Use Case per Feature Refactor

## Architecture Decision

Split anemic CRUD use case classes into individual single-responsibility use case classes. Each class has a single `execute()` method that delegates to the injected port.

## Tradeoffs

| Alternative | Pros | Cons |
|---|---|---|
| Keep current structure | Zero refactor cost | Violates ISP, harder to test, no room for business logic |
| One use case per feature (chosen) | Clean SRP, easy testing, ready for business logic | More files, more DI boilerplate |
| Keep as-is but rename methods | Minimal change | Still violates ISP, same mocking overhead |

## Design Decisions

### Decision 1: `execute()` vs delegated method name

**Chosen**: `execute()` — consistent interface across all use cases, enables future middleware/wrapper patterns.

Alternative: use `create()`, `findAll()`, etc. — would match port method names but inconsistent interface.

### Decision 2: File naming

`kebab-case-operation.single-entity.use-case.ts` — e.g., `create-product.use-case.ts`

Class name: `CreateProductUseCase` (PascalCase, matches file without extension).

### Decision 3: Port injection per use case

Each use case injects the same port token that the old aggregated class injected. Only `GetOrdersByUserUseCase` injects `UserRepository` directly (because `getOrdersByUser` is not in `BaseCrudService`).

### Decision 4: Feature branch chain strategy

A tracker branch (`feature/use-case-per-feature`) will accumulate all changes. Chained PRs will target previous branches, and only the tracker merges to develop.

### Decision 5: Implementation order

Products first (no external deps), then Brands, Categories, Customers, Users last (depends on FindAllProductsUseCase).

## File Structure After Refactor

```
src/products/application/
├── create-brand.use-case.ts
├── create-category.use-case.ts
├── create-product.use-case.ts
├── delete-brand.use-case.ts
├── delete-category.use-case.ts
├── delete-product.use-case.ts
├── find-all-brands.use-case.ts
├── find-all-categories.use-case.ts
├── find-all-products.use-case.ts
├── find-one-brand.use-case.ts
├── find-one-category.use-case.ts
├── find-one-product.use-case.ts
├── update-brand.use-case.ts
├── update-category.use-case.ts
└── update-product.use-case.ts

src/users/application/
├── create-customer.use-case.ts
├── create-user.use-case.ts
├── delete-customer.use-case.ts
├── delete-user.use-case.ts
├── find-all-customers.use-case.ts
├── find-all-users.use-case.ts
├── find-one-customer.use-case.ts
├── find-one-user.use-case.ts
├── get-orders-by-user.use-case.ts
├── update-customer.use-case.ts
└── update-user.use-case.ts
```

Each with a corresponding `.spec.ts` file.
