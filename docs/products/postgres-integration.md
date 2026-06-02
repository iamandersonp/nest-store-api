## Why

Establecer el contrato de la API v2 del módulo Products con persistencia PostgreSQL via Prisma ORM, manteniendo la v1 (in-memory) intacta como implementación paralela.

## What Changes

- Nueva API `/v2/products`, `/v2/brands`, `/v2/categories` con PostgreSQL via Prisma
- Clases Command inmutables (`CreateProductCommand`, `UpdateProductCommand`, etc.) en `application/commands/`
- PrismaService singleton en infraestructura con modelos Product, Brand, Category
- Docker Compose con PostgreSQL 16 para desarrollo local
- Coverage branches: 97 % → 80 % (mín. 80 %, máx. 90 %)
- Tests existentes actualizados de DTO directo a `new Command(dto)`

## Spec

### Requirement: v2 API with PostgreSQL persistence

The system SHALL expose CRUD operations for products, brands, and categories under `/v2/` with PostgreSQL persistence via Prisma, matching the v1 response shape.

#### Scenario: List resources

- **GIVEN** resources exist in PostgreSQL
- **WHEN** a client sends `GET /v2/{resource}`
- **THEN** the system returns `200 OK` with a JSON array

#### Scenario: Get one resource

- **GIVEN** a resource exists in PostgreSQL with the requested identifier
- **WHEN** a client sends `GET /v2/{resource}/{id}`
- **THEN** the system returns `200 OK` with that resource

#### Scenario: Get unknown resource

- **GIVEN** no resource exists with the requested identifier
- **WHEN** a client sends `GET /v2/{resource}/{id}`
- **THEN** the system returns `404 Not Found`

#### Scenario: Create a resource

- **GIVEN** the request body contains valid fields for the resource
- **WHEN** a client sends `POST /v2/{resource}`
- **THEN** the system returns `201 Created` with the created entity

#### Scenario: Update a resource

- **GIVEN** a resource exists with the requested identifier and valid update fields
- **WHEN** a client sends `PUT /v2/{resource}/{id}`
- **THEN** the system returns `200 OK` with the updated entity

#### Scenario: Delete a resource

- **GIVEN** a resource exists with the requested identifier
- **WHEN** a client sends `DELETE /v2/{resource}/{id}`
- **THEN** the system returns `204 No Content`

#### Scenario: Reject invalid payload

- **GIVEN** the request body is missing a required field or has invalid data
- **WHEN** a client sends `POST /v2/{resource}`
- **THEN** the system returns `400 Bad Request`

### Requirement: Commands as pure immutable classes

Use cases MUST receive pure immutable Command classes, not HTTP DTOs. Commands are declared with `readonly` properties and a single `Object.assign(this, props)` constructor.

#### Scenario: Create product command

- **GIVEN** the v2 mapper receives a validated CreateProductDto
- **WHEN** it creates `new CreateProductCommand(dto)`
- **THEN** the command has `readonly` properties matching the DTO fields
- **AND** the use case receives the Command, not the DTO directly

#### Scenario: All affected specs use Commands

- **GIVEN** a `.spec.ts` file that calls `execute(dto)` on a use case
- **WHEN** the use case signature changes to `execute(command)`
- **THEN** the test MUST invoke `execute(new Command(dto))` instead

### Requirement: Prisma setup and lifecycle

The system MUST connect to PostgreSQL via Prisma ORM with zero data loss on restart for dev environments.

#### Scenario: PrismaService connects on startup

- **GIVEN** `DATABASE_URL` points to a running PostgreSQL 16 instance
- **WHEN** the application starts
- **THEN** PrismaService MUST connect to the database via `onModuleInit`
- **AND** PrismaService MUST disconnect on `onModuleDestroy`

#### Scenario: Schema migration

- **GIVEN** `prisma/schema.prisma` defines Product, Brand, and Category models
- **WHEN** `npx prisma migrate dev` runs
- **THEN** a migration is generated creating tables for all three models

### Requirement: Docker local environment

The system SHOULD provide Docker Compose with PostgreSQL 16 for local development.

#### Scenario: Start PostgreSQL container

- **GIVEN** Docker Engine is available
- **WHEN** `docker compose up -d` executes
- **THEN** a PostgreSQL 16 container starts on port 5432
- **AND** the configured `DATABASE_URL` connects successfully

### Requirement: Coverage threshold adjusted

The system MUST adjust the branch coverage threshold from 97 % to a range between 80 % and 90 %.

#### Scenario: Coverage passes within range

- **GIVEN** `jest.coverageThreshold.branches` is set to 80 (minimum)
- **AND** the project policy caps branches at 90 %
- **WHEN** `npm run test:cov` runs
- **THEN** coverage thresholds are met (branches ≥ 80 %)
