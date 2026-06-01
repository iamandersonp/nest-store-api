## Why

Registrar el contrato inicial de órdenes visible hoy en el módulo `users` para dar trazabilidad SDD a la agregación de órdenes por usuario.

## What Changes

- Se documenta la consulta de órdenes por usuario expuesta en `/v1/users/{userId}/orders`.
- Se deja explicitado que el recurso `orders` aún no define operaciones CRUD públicas propias.

## Spec

### Requirement: Expose user order aggregation

The system SHALL expose a user order aggregate under `/v1/users/{userId}/orders`.

#### Scenario: Return an order aggregate for a user

- **GIVEN** a user exists with the requested identifier
- **WHEN** a client sends `GET /v1/users/{userId}/orders`
- **THEN** the system returns `200 OK`
- **AND** the response body contains an order structure with `user`, `products`, `date`, and `total`

### Requirement: Preserve an explicit orders feature boundary

The system MUST keep order-specific contracts documented independently from the `users` CRUD resource.

#### Scenario: Track the orders feature separately

- **GIVEN** future work adds dedicated order endpoints or mutations
- **WHEN** the feature is implemented
- **THEN** the change is documented in this file before or alongside code changes
