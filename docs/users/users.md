## Why

Inicializar la documentación SDD para el recurso `users` y su consulta de órdenes asociadas.

## What Changes

- Se documenta el CRUD de `users` en `/v1/users`.
- Se documenta la consulta de órdenes de un usuario en `/v1/users/{userId}/orders`.

## Spec

### Requirement: Manage users

The system SHALL expose CRUD operations for users under `/v1/users`.

#### Scenario: List users

- **GIVEN** users exist in the in-memory store
- **WHEN** a client sends `GET /v1/users`
- **THEN** the system returns `200 OK`
- **AND** the response body is a JSON array of users

#### Scenario: Get one user

- **GIVEN** a user exists with the requested identifier
- **WHEN** a client sends `GET /v1/users/{userId}`
- **THEN** the system returns `200 OK`
- **AND** the response body contains that user

#### Scenario: Create a user

- **GIVEN** the request body contains valid `firstName`, `lastName`, `userName`, `password`, and `role`
- **WHEN** a client sends `POST /v1/users`
- **THEN** the system returns `201 Created`
- **AND** the response body contains the created user

#### Scenario: Update a user

- **GIVEN** a user exists with the requested identifier
- **WHEN** a client sends `PUT /v1/users/{id}` with valid fields
- **THEN** the system returns `200 OK`
- **AND** the response body contains the updated user

#### Scenario: Delete a user

- **GIVEN** a user exists with the requested identifier
- **WHEN** a client sends a delete request for that user
- **THEN** the system returns `204 No Content`

### Requirement: Retrieve user orders

The system SHALL provide an order summary for a specific user under `/v1/users/{userId}/orders`.

#### Scenario: Get orders for an existing user

- **GIVEN** a user exists with the requested identifier
- **WHEN** a client sends `GET /v1/users/{userId}/orders`
- **THEN** the system returns `200 OK`
- **AND** the response body contains an order aggregate with the user and related products

### Requirement: Validate user payloads

The system MUST reject invalid user payloads.

#### Scenario: Reject invalid user creation

- **GIVEN** the request body is missing any required string field
- **WHEN** a client sends `POST /v1/users`
- **THEN** the system returns `400 Bad Request`
