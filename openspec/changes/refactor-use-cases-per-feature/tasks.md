# Tasks: Use Case per Feature Refactor

## Review Workload Forecast

- **Estimated changed lines**: ~1,476 (net)
- **400-line budget risk**: High (exceeds by 3.7x)
- **Decision needed before apply**: Chained PRs recommended
- **Strategy**: Feature-branch-chain on tracker `feature/use-case-per-feature`

## Tasks

### Phase 1: Products — create use cases and specs

#### Task 1.1: Create CreateProductUseCase
- File: `src/products/application/create-product.use-case.ts`
- Content: `@Injectable()` class with `execute(payload)` delegating to `PRODUCTS_SERVICE_PORT`
- Spec: `src/products/application/create-product.use-case.spec.ts`
- Lines: ~60

#### Task 1.2: Create FindAllProductsUseCase
- File: `src/products/application/find-all-products.use-case.ts`
- Content: class with `execute()` delegating to port.findAll
- Spec: `src/products/application/find-all-products.use-case.spec.ts`
- Lines: ~55

#### Task 1.3: Create FindOneProductUseCase
- File: `src/products/application/find-one-product.use-case.ts`
- Content: class with `execute(id)` delegating to port.findOne
- Spec: `src/products/application/find-one-product.use-case.spec.ts`
- Lines: ~55

#### Task 1.4: Create UpdateProductUseCase
- File: `src/products/application/update-product.use-case.ts`
- Content: class with `execute(id, payload)` delegating to port.update
- Spec: `src/products/application/update-product.use-case.spec.ts`
- Lines: ~60

#### Task 1.5: Create DeleteProductUseCase
- File: `src/products/application/delete-product.use-case.ts`
- Content: class with `execute(id)` delegating to port.delete
- Spec: `src/products/application/delete-product.use-case.spec.ts`
- Lines: ~50

### Phase 2: Brands — create use cases and specs

#### Task 2.1-2.5: Create Brand use cases (same pattern as Products)
- 5 files + 5 specs, ~280 lines total

### Phase 3: Categories — create use cases and specs

#### Task 3.1-3.5: Create Category use cases (same pattern as Products)
- 5 files + 5 specs, ~280 lines total

### Phase 4: Customers — create use cases and specs

#### Task 4.1-4.5: Create Customer use cases (same pattern as Products)
- 5 files + 5 specs, ~280 lines total

### Phase 5: Users — create use cases and specs

#### Task 5.1-5.5: Create User CRUD use cases (same pattern)
- 5 files + 5 specs, ~275 lines

#### Task 5.6: Create GetOrdersByUserUseCase
- File: `src/users/application/get-orders-by-user.use-case.ts`
- Injects `UserRepository` directly (not BaseCrudService)
- Spec: `src/users/application/get-orders-by-user.use-case.spec.ts`
- Lines: ~55

### Phase 6: Update controllers

#### Task 6.1: Update ProductsController
- Inject 5 individual use cases instead of ProductUseCaseService
- Each endpoint calls useCase.execute()
- Update spec

#### Task 6.2: Update BrandsController
- Same pattern as 6.1

#### Task 6.3: Update CategoriesController
- Same pattern as 6.1

#### Task 6.4: Update UsersController
- Inject 6 individual use cases
- Update spec

#### Task 6.5: Update CustomersController
- Same pattern as 6.1

### Phase 7: Update modules

#### Task 7.1: Update ProductsModule
- Register all 15 use cases in providers
- Export only FindAllProductsUseCase

#### Task 7.2: Update UsersModule
- Register all 11 use cases in providers

### Phase 8: Update UsersService

#### Task 8.1: Update UsersService
- Change import from `ProductUseCaseService` to `FindAllProductsUseCase`
- Update spec mock

### Phase 9: Remove old files

#### Task 9.1-9.10: Delete old use cases and specs
- Delete 5 service files + 5 spec files
- Verify no remaining imports

### Phase 10: Verify

#### Task 10.1: Run tests and lint
- `npm test` — all 130+ tests pass
- `npm run lint` — clean
- Verify no dead imports

## Dependency Order

```
Phase 1 (Products use cases)
  ├── Phase 2 (Brands use cases)
  ├── Phase 3 (Categories use cases)
  ├── Phase 6.1 (ProductsController)
  │     └── Phase 7.1 (ProductsModule)
  ├── Phase 6.2 (BrandsController)
  ├── Phase 6.3 (CategoriesController)
  │
Phase 4 (Customers use cases)
  ├── Phase 5 (Users use cases + GetOrdersByUser)
  ├── Phase 6.5 (CustomersController)
  ├── Phase 6.4 (UsersController)
  │     └── Phase 8 (UsersService — depends on FindAllProductsUseCase)
  └── Phase 7.2 (UsersModule)

Phase 9 (Delete old files — after all imports updated)
Phase 10 (Verify)
```

## Chained PR Plan

| PR | Branch | Content | Est. Lines |
|---|---|---|---|
| PR #1 | feature/use-case-pr1 | Products use cases (Phase 1) + ProductsController (6.1) + ProductsModule (7.1) | ~380 |
| PR #2 | feature/use-case-pr2 | Brands use cases (Phase 2) + BrandsController (6.2) | ~340 |
| PR #3 | feature/use-case-pr3 | Categories use cases (Phase 3) + CategoriesController (6.3) | ~340 |
| PR #4 | feature/use-case-pr4 | Customers (Phase 4) + Users (Phase 5) + Controllers (6.4, 6.5) | ~500 |
| PR #5 | feature/use-case-pr5 | UsersService (8), Module updates (7.2), Delete old (9), Verify (10) | ~200 |
