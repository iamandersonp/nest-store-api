# Convenciones de código

## Naming de archivos

| Tipo               | Patrón                  | Ubicación                                             |
| ------------------ | ----------------------- | ----------------------------------------------------- |
| Entidad de dominio | `*.entity.ts`           | `<module>/domain/models/`                             |
| Puerto / token DI  | `*.port.ts`             | `<module>/domain/ports/`                              |
| Caso de uso        | `*-use-case.ts`         | `<module>/application/`                               |
| Controlador HTTP   | `*.controller.ts`       | `<module>/infrastructure/adapters/in/v1/controllers/` |
| Service adapter    | `*.service.ts`          | `<module>/infrastructure/adapters/in/v1/services/`    |
| DTO                | `*.dto.ts`              | `<module>/infrastructure/adapters/in/v1/dtos/`        |
| Test unitario      | `*.spec.ts`             | Junto al archivo bajo prueba                          |
| Test e2e           | `*.e2e-spec.ts`         | `test/`                                               |
| Módulo Nest        | `<module>.module.ts`    | Raíz del módulo                                       |

## DTOs

- Usar `class-validator` (`@IsString`, `@IsNumber`, `@IsPositive`, `@IsUrl`, etc.).
- Propiedades `readonly` con `!` (definite assignment).
- `UpdateXxxDto extends PartialType(CreateXxxDto)` desde **`@nestjs/swagger`** (no desde `@nestjs/mapped-types`).

## Controllers

- `@Controller({ path: 'recurso', version: '1' })` (versionado URI activado en `main.ts`).
- Usar `ParseIntPipe` para params numéricos.
- Documentar cada método con JSDoc (estilo Compodoc: `@param`, `@return`, `@memberof`).

## Tokens DI

```ts
export const PRODUCTS_SERVICE_PORT: InjectionToken = Symbol('PRODUCTS_SERVICE_PORT');
```

Nombres en `SCREAMING_SNAKE_CASE` con sufijo `_PORT`.

## Pipes globales

`main.ts` aplica `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })`. No reimplementar validación manual en controllers.

## Estilo Prettier

- `singleQuote: true`
- `trailingComma: 'all'`
- `printWidth: 100`
- `endOfLine: 'lf'`
- `semi: true`
- `tabWidth: 2`

## ESLint

- Config flat type-checked (`tseslint.configs.recommendedTypeChecked`).
- Reglas relajadas en `*.spec.ts` para permitir mocks (`no-unsafe-*`, `unbound-method` desactivadas).
- `jest/no-focused-tests` y `jest/no-conditional-expect` son **errores**.

## Conventional Commits

Los commits siguen [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <subject>
```

Tipos comunes: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `build`, `ci`, `perf`, `style`. El `scope` es opcional pero recomendado (módulo afectado).

Ejemplos:

- `feat(products): add brand filter on findAll`
- `fix(users): validate email uniqueness`
- `test(products): add use-case spec for delete`
- `docs(products): add brand feature spec`

## OpenSpec docs

Cada feature **debe** documentarse en `docs/<module>/<feature>.md` siguiendo el patrón [OpenSpec](https://github.com/Fission-AI/OpenSpec). El archivo se crea o actualiza en el mismo PR que introduce el cambio.

Estructura mínima:

```markdown
## Why

Motivación / contexto de negocio.

## What Changes

- Lista de cambios visibles.

## Spec

### Requirement: <Nombre>

The system SHALL <comportamiento observable>.

#### Scenario: <Caso>

- **GIVEN** <precondición>
- **WHEN** <acción>
- **THEN** <resultado esperado>
```

Usar `SHALL` / `MUST` para requisitos normativos y al menos un `Scenario` Given/When/Then por requirement.

## JSDoc

Todas las clases públicas, métodos y propiedades de DTOs/entidades llevan JSDoc con `@param`, `@return`, `@type`, `@memberof`. Compodoc consume estos comentarios.

## TypeScript Strict Skill

Este proyecto incluye la skill **[typescript-strict](../../skills/typescript-strict/SKILL.md)** de uso general con reglas estrictas de tipado. Se aplica a toda la base de código:

- TSConfig strict mode, `noImplicitAny`, `strictBindCallApply`
- Prohibido el uso de `any` (salvo excepciones en tests)
- Const types pattern, flat interfaces, discriminated unions
- Type guards, branded types, `import type`
- Tipado específico para hexagonal: domain entities, ports, use-cases, DTOs, DI tokens

Cargala automáticamente al escribir o modificar cualquier tipo, interfaz, DTO, entidad, puerto o caso de uso.
