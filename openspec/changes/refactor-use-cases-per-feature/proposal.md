# Proposal: Refactor Use Cases to Single-Responsibility per Feature

## Intent

Split the current monolithic CRUD use cases (one class per entity with 5-6 methods) into individual use case classes, each handling exactly one operation. This follows the Single Responsibility Principle and aligns with Command/Query pattern conventions.

## Scope

**In scope:**
- 5 current use case classes → 26 single-operation use cases
- Controllers (5): update constructor injection to use multiple specific use cases
- Modules (2): expand providers to register all new use cases
- UsersService: update dependency from ProductUseCaseService to FindAllProductsUseCase
- All corresponding specs (26 new use case specs + 5 updated controller specs)
- User's controller spec (update injection pattern)
- Removal of 10 old files (5 use cases + 5 specs)

**Out of scope:**
- Domain/entity layer — no changes to entities, ports, or interfaces
- Adapters layer — no changes to service adapters (ProductsService, BrandsService, etc.)
- Routes or API contract — no behavioral changes
- Mappers — no changes to existing mappers
- OrdersController — currently a stub, no changes needed

## Approach

1. Create 26 new use case files under `src/{products,users}/application/` (`.ts` + `.spec.ts`)
2. Each use case has a single `execute()` method that delegates to the injected port
3. Update 5 controllers to inject individual use cases instead of aggregated ones
4. Update 2 modules to register all new use cases
5. Update UsersService import from `ProductUseCaseService` to `FindAllProductsUseCase`
6. Delete old 10 files
7. Verify all tests pass

## Problem Statement

The current use cases are anemic pass-through classes with no business logic. Each class bundles 5 operations into one injected dependency, which:
- Makes controllers depend on methods they don't use
- Bloats the DI container with unnecessary baggage
- Violates Interface Segregation Principle
- Makes future business logic harder to add (would need conditional logic in one class)
- Makes test mocking unnecessarily verbose (mock 5 methods to test 1)

## Risk Assessment

- **Low risk**: All use cases are pure pass-through (delegate to port), so the change is structural, not behavioral
- **Medium risk**: UsersService imports from ProductsModule — must ensure the new FindAllProductsUseCase is properly exported
- **Naming collision risk**: File names like `delete-product.use-case.ts` must be consistent across all entities
