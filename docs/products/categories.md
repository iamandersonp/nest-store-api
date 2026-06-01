## Why

Documentar el comportamiento esperado del recurso de categorías como base de trabajo SDD del módulo `products`.

## What Changes

- Se documenta el contrato CRUD de `categories` bajo `/v1/categories`.
- Se fija la validación básica del nombre de categoría.

## Spec

### Requirement: Manage categories

The system SHALL expose CRUD operations for categories under `/v1/categories`.

#### Scenario: List categories

- **GIVEN** categories exist in the catalog
- **WHEN** a client sends `GET /v1/categories`
- **THEN** the system returns `200 OK`
- **AND** the response body is a JSON array of categories

#### Scenario: Get one category

- **GIVEN** a category exists with the requested identifier
- **WHEN** a client sends `GET /v1/categories/{categoryId}`
- **THEN** the system returns `200 OK`
- **AND** the response body contains that category

#### Scenario: Unknown category

- **GIVEN** no category exists with the requested identifier
- **WHEN** a client sends `GET /v1/categories/{categoryId}`
- **THEN** the system returns `404 Not Found`

#### Scenario: Create a category

- **GIVEN** the request body contains a valid `name`
- **WHEN** a client sends `POST /v1/categories`
- **THEN** the system returns `201 Created`
- **AND** the response body contains the created category

#### Scenario: Update a category

- **GIVEN** a category exists with the requested identifier
- **WHEN** a client sends `PUT /v1/categories/{id}` with valid fields
- **THEN** the system returns `200 OK`
- **AND** the response body contains the updated category

#### Scenario: Delete a category

- **GIVEN** a category exists with the requested identifier
- **WHEN** a client sends a delete request for that category
- **THEN** the system returns `204 No Content`

### Requirement: Validate category payloads

The system MUST reject invalid category payloads.

#### Scenario: Reject invalid category creation

- **GIVEN** the request body has an empty or missing `name`
- **WHEN** a client sends `POST /v1/categories`
- **THEN** the system returns `400 Bad Request`
