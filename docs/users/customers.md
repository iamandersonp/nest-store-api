## Why

Bootstrap de la documentación SDD para el recurso `customers` del módulo `users`.

## What Changes

- Se documenta el contrato CRUD de `customers` bajo `/v1/customers`.
- Se fijan validaciones visibles para teléfono, foto e identificador de usuario.

## Spec

### Requirement: Manage customers

The system SHALL expose CRUD operations for customers under `/v1/customers`.

#### Scenario: List customers

- **GIVEN** customers exist in the in-memory store
- **WHEN** a client sends `GET /v1/customers`
- **THEN** the system returns `200 OK`
- **AND** the response body is a JSON array of customers

#### Scenario: Get one customer

- **GIVEN** a customer exists with the requested identifier
- **WHEN** a client sends `GET /v1/customers/{customerId}`
- **THEN** the system returns `200 OK`
- **AND** the response body contains that customer

#### Scenario: Create a customer

- **GIVEN** the request body contains a valid `phone`, `photo`, and positive `idUser`
- **WHEN** a client sends `POST /v1/customers`
- **THEN** the system returns `201 Created`
- **AND** the response body contains the created customer

#### Scenario: Update a customer

- **GIVEN** a customer exists with the requested identifier
- **WHEN** a client sends `PUT /v1/customers/{id}` with valid fields
- **THEN** the system returns `200 OK`
- **AND** the response body contains the updated customer

#### Scenario: Delete a customer

- **GIVEN** a customer exists with the requested identifier
- **WHEN** a client sends a delete request for that customer
- **THEN** the system returns `204 No Content`

### Requirement: Validate customer payloads

The system MUST reject invalid customer payloads.

#### Scenario: Reject invalid customer creation

- **GIVEN** the request body contains an invalid phone number or a non-positive `idUser`
- **WHEN** a client sends `POST /v1/customers`
- **THEN** the system returns `400 Bad Request`
