# Spec: Use Case per Feature Refactor

## Why

Simplify the architecture, align with Command/Query pattern, reduce mocking overhead in tests, and prepare each use case to evolve independently with business logic.

## What Changes

- 5 use case classes (`ProductUseCaseService`, `BrandUseCaseService`, `CategoryUseCaseService`, `UserUseCaseService`, `CustomerUseCaseService`) are removed
- 26 single-operation use case classes are created (5 per entity + 1 `GetOrdersByUser`)
- Each new use case exposes an `execute()` method (consistent interface)
- Controllers inject individual use cases per endpoint
- Modules register all individual use cases
- UsersService dependency updated

## Spec

### Requirement: CreateProductUseCase

The system SHALL delegate product creation to the product port.

#### Scenario: Delegates to port.create

- **GIVEN** a valid create product payload
- **WHEN** `CreateProductUseCase.execute(payload)` is called
- **THEN** it calls `port.create(payload)` and returns the created product

### Requirement: FindAllProductsUseCase

The system SHALL delegate product listing to the product port.

#### Scenario: Delegates to port.findAll

- **GIVEN** products exist in the store
- **WHEN** `FindAllProductsUseCase.execute()` is called
- **THEN** it calls `port.findAll()` and returns the product array

### Requirement: FindOneProductUseCase

The system SHALL delegate single product retrieval to the product port.

#### Scenario: Delegates to port.findOne

- **GIVEN** a product exists with the given id
- **WHEN** `FindOneProductUseCase.execute(id)` is called
- **THEN** it calls `port.findOne(id)` and returns the product

### Requirement: UpdateProductUseCase

The system SHALL delegate product update to the product port.

#### Scenario: Delegates to port.update

- **GIVEN** a product exists with the given id
- **WHEN** `UpdateProductUseCase.execute(id, payload)` is called
- **THEN** it calls `port.update(id, payload)` and returns the updated product

### Requirement: DeleteProductUseCase

The system SHALL delegate product deletion to the product port.

#### Scenario: Delegates to port.delete

- **GIVEN** a product exists with the given id
- **WHEN** `DeleteProductUseCase.execute(id)` is called
- **THEN** it calls `port.delete(id)`

### Requirement: Brand use cases (Create, FindAll, FindOne, Update, Delete)

Same pattern as product use cases, delegating to the brand port.

### Requirement: Category use cases (Create, FindAll, FindOne, Update, Delete)

Same pattern as product use cases, delegating to the category port.

### Requirement: Customer use cases (Create, FindAll, FindOne, Update, Delete)

Same pattern as product use cases, delegating to the customer port.

### Requirement: User CRUD use cases (Create, FindAll, FindOne, Update, Delete)

Same pattern as product use cases, delegating to `UserRepository` as `BaseCrudService`.

### Requirement: GetOrdersByUserUseCase

The system SHALL delegate order retrieval to `UserRepository.getOrdersByUser`.

#### Scenario: Delegates to port.getOrdersByUser

- **GIVEN** a user exists with the given id
- **WHEN** `GetOrdersByUserUseCase.execute(userId)` is called
- **THEN** it calls `port.getOrdersByUser(userId)` and returns the order

### Requirement: Controller dependency update

The system SHALL update controllers to inject individual use cases.

#### Scenario: ProductsController

- **GIVEN** ProductsController is instantiated
- **WHEN** the module compiles
- **THEN** ProductsController receives 5 individual use cases (Create, FindAll, FindOne, Update, Delete)
- **AND** each endpoint uses its corresponding use case

#### Scenario: BrandsController

- **GIVEN** BrandsController is instantiated
- **WHEN** the module compiles
- **THEN** BrandsController receives 5 individual use cases

#### Scenario: CategoriesController

- **GIVEN** CategoriesController is instantiated
- **WHEN** the module compiles
- **THEN** CategoriesController receives 5 individual use cases

#### Scenario: UsersController

- **GIVEN** UsersController is instantiated
- **WHEN** the module compiles
- **THEN** UsersController receives 6 individual use cases (5 CRUD + GetOrdersByUser)

#### Scenario: CustomersController

- **GIVEN** CustomersController is instantiated
- **WHEN** the module compiles
- **THEN** CustomersController receives 5 individual use cases

### Requirement: Module provider registration

The system SHALL register all new use cases as providers in their respective modules.

#### Scenario: ProductsModule

- **GIVEN** ProductsModule is defined
- **WHEN** the module compiles
- **THEN** all 15 use case providers are registered (5 for product, 5 for brand, 5 for category)
- **AND** only FindAllProductsUseCase is exported (needed by UsersModule)

#### Scenario: UsersModule

- **GIVEN** UsersModule is defined
- **WHEN** the module compiles
- **THEN** all 11 use case providers are registered (6 for user, 5 for customer)

### Requirement: UsersService dependency update

The system SHALL update UsersService to use `FindAllProductsUseCase` instead of `ProductUseCaseService`.

#### Scenario: Updated import

- **GIVEN** UsersService is defined
- **WHEN** the module compiles
- **THEN** it imports `FindAllProductsUseCase` from `@products/application/find-all-products.use-case`
- **AND** no references to `ProductUseCaseService` remain

### Requirement: Old files removed

The system SHALL remove all 10 old use case files (5 classes + 5 specs).

#### Scenario: No orphan imports

- **GIVEN** all old files are deleted
- **WHEN** the project compiles
- **THEN** no imports reference the deleted files
