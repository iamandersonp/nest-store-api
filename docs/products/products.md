## Why

Establecer una línea base SDD para el recurso de productos expuesto por la API versionada.

## What Changes

- Se documenta el contrato observable de CRUD para `products` en `/v1/products`.
- Se registran reglas mínimas de validación y manejo de no encontrados.

## Spec

### Requirement: Manage products

The system SHALL expose CRUD operations for products under `/v1/products`.

#### Scenario: List products

- **GIVEN** products exist in the in-memory catalog
- **WHEN** a client sends `GET /v1/products`
- **THEN** the system returns `200 OK`
- **AND** the response body is a JSON array of products

#### Scenario: Get one product

- **GIVEN** a product exists with the requested identifier
- **WHEN** a client sends `GET /v1/products/{productId}`
- **THEN** the system returns `200 OK`
- **AND** the response body contains that product

#### Scenario: Get an unknown product

- **GIVEN** no product exists with the requested identifier
- **WHEN** a client sends `GET /v1/products/{productId}`
- **THEN** the system returns `404 Not Found`

#### Scenario: Create a product

- **GIVEN** the request body contains a valid name, description, price, stock, and image URL
- **WHEN** a client sends `POST /v1/products`
- **THEN** the system returns `201 Created`
- **AND** the response body contains the created product with an identifier

#### Scenario: Update a product

- **GIVEN** a product exists with the requested identifier
- **AND** the request body contains valid product fields to modify
- **WHEN** a client sends `PUT /v1/products/{id}`
- **THEN** the system returns `200 OK`
- **AND** the response body contains the updated product

#### Scenario: Delete a product

- **GIVEN** a product exists with the requested identifier
- **WHEN** a client sends a delete request for that product
- **THEN** the system returns `204 No Content`

### Requirement: Validate product payloads

The system MUST reject invalid product payloads before they reach application logic.

#### Scenario: Reject invalid create payload

- **GIVEN** the request body is missing a required field or contains a non-positive `price` or `stock`
- **WHEN** a client sends `POST /v1/products`
- **THEN** the system returns `400 Bad Request`
