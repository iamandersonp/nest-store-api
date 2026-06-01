## Why

Definir la especificación inicial del recurso de marcas para mantener trazabilidad SDD en el módulo `products`.

## What Changes

- Se documenta el contrato CRUD de `brands` bajo `/v1/brands`.
- Se explicita la validación de nombre e imagen URL.

## Spec

### Requirement: Manage brands

The system SHALL expose CRUD operations for brands under `/v1/brands`.

#### Scenario: List brands

- **GIVEN** brands exist in the catalog
- **WHEN** a client sends `GET /v1/brands`
- **THEN** the system returns `200 OK`
- **AND** the response body is a JSON array of brands

#### Scenario: Get one brand

- **GIVEN** a brand exists with the requested identifier
- **WHEN** a client sends `GET /v1/brands/{brandId}`
- **THEN** the system returns `200 OK`
- **AND** the response body contains that brand

#### Scenario: Unknown brand

- **GIVEN** no brand exists with the requested identifier
- **WHEN** a client sends `GET /v1/brands/{brandId}`
- **THEN** the system returns `404 Not Found`

#### Scenario: Create a brand

- **GIVEN** the request body contains a valid `name` and `image`
- **WHEN** a client sends `POST /v1/brands`
- **THEN** the system returns `201 Created`
- **AND** the response body contains the created brand

#### Scenario: Update a brand

- **GIVEN** a brand exists with the requested identifier
- **WHEN** a client sends `PUT /v1/brands/{id}` with valid fields
- **THEN** the system returns `200 OK`
- **AND** the response body contains the updated brand

#### Scenario: Delete a brand

- **GIVEN** a brand exists with the requested identifier
- **WHEN** a client sends a delete request for that brand
- **THEN** the system returns `204 No Content`

### Requirement: Validate brand payloads

The system MUST reject invalid brand payloads.

#### Scenario: Reject invalid brand creation

- **GIVEN** the request body has an empty `name` or an invalid `image` URL
- **WHEN** a client sends `POST /v1/brands`
- **THEN** the system returns `400 Bad Request`
