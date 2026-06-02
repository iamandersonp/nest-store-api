# AGENTS.md

Guía operativa para agentes de IA (y humanos) que trabajen en **nest-store-api**.

> ℹ️ Para una descripción más narrativa del proyecto, ver [README.md](./README.md).

---

## Referencia rápida

| Archivo                                                          | Contenido                                           |
| ---------------------------------------------------------------- | --------------------------------------------------- |
| [STACK](./docs/agents/STACK.md)                                  | Stack tecnológico detallado                         |
| [ARCHITECTURE](./docs/agents/ARCHITECTURE.md)                    | Estructura de carpetas + hexagonal                  |
| [CONVENTIONS](./docs/agents/CONVENTIONS.md)                      | Naming, DTOs, DI, estilo, commits, OpenSpec         |
| [WORKFLOW](./docs/agents/WORKFLOW.md)                            | SDD workflow + Strict TDD + nuevo recurso           |
| [TESTING](./docs/agents/TESTING.md)                              | Testing patterns y ejemplos                         |
| [COMMANDS](./docs/agents/COMMANDS.md)                            | Comandos npm                                        |
| [CONFIG](./docs/agents/CONFIG.md)                                | Variables de entorno + OpenSpec config              |
| [Products](./docs/products/products.md)                          | Spec OpenSpec: productos CRUD                       |
| [Brands](./docs/products/brands.md)                              | Spec OpenSpec: marcas CRUD                          |
| [Categories](./docs/products/categories.md)                      | Spec OpenSpec: categorías CRUD                      |
| [Users](./docs/users/users.md)                                   | Spec OpenSpec: usuarios CRUD + órdenes              |
| [Customers](./docs/users/customers.md)                           | Spec OpenSpec: clientes CRUD                        |
| [Orders](./docs/users/orders.md)                                 | Spec OpenSpec: órdenes por usuario                  |
| [typescript-strict](./skills/typescript-strict/SKILL.md)         | Skill: reglas estrictas de TypeScript               |
| [nestjs-best-practices](./skills/nestjs-best-practices/SKILL.md) | Skill: mejores prácticas de NestJS para el proyecto |

---

## Stack rápido

NestJS 11 + TypeScript 5.7 + Jest 30 + ESLint 9. Node 20.20 via nvm.
Ver [STACK.md](./docs/agents/STACK.md).

## Arquitectura

Hexagonal (Puertos y Adaptadores). Las dependencias van `infrastructure → application → domain`.
Ver [ARCHITECTURE.md](./docs/agents/ARCHITECTURE.md).

Patrón adicional no documentado en los agent docs:
- **Mappers** estáticos en `infrastructure/.../mappers/` convierten DTOs HTTP ↔ entidades de dominio (ej: `ProductMapper.fromCreateDto()`, `.toDto()`).
- **Errores de dominio** en `domain/errors/*.error.ts` (ej: `ProductNotFoundError`). Controllers los capturan y traducen a excepciones HTTP.

## Convenciones

Conventional Commits, TDD, OpenSpec docs, naming estricto.
Ver [CONVENTIONS.md](./docs/agents/CONVENTIONS.md).

## SDD + Strict TDD

Este proyecto usa **Spec-Driven Development** con **Strict TDD**.
Todo cambio significativo pasa por `explore → propose → spec → design → tasks → apply → verify → archive`.
Durante `apply`, se sigue el ciclo **Red → Green → Refactor** obligatoriamente.
Ver [WORKFLOW.md](./docs/agents/WORKFLOW.md).

---

## Memoria persistente (Engram)

Este proyecto tiene acceso a **Engram** (MCP) para memoria entre sesiones.

- **Guardar** automáticamente después de decisiones, bugs, descubrimientos, configuraciones.
- **Buscar** antes de empezar algo que puede haberse hecho antes.
- Al **cerrar sesión**, llamar `mem_session_summary`.

Formato `mem_save`:

```text
**What**: [qué se hizo]
**Why**: [motivación]
**Where**: [archivos afectados]
**Learned**: [gotchas, edge cases]
```

Topic key para upserts: `sdd-init/{project}`, `sdd/{change-name}/{phase}`.

---

## Contexto duro (fácil de errar si no se revisa)

- **Sin `typecheck`**: No existe `npm run typecheck`. TypeScript errors se detectan via `nest build` o ESLint type-checked rules.
- **Cobertura extrema**: `jest.coverageThreshold` exige 97% branches, 100% functions/lines/statements. Solo `users.service.ts` tiene una excepción (88% branches).
- **Swagger UI** en `/api`, JSON spec en `/api/json` (generado por `@nestjs/swagger` + plugin en `nest-cli.json`).
- **`engine-strict=true`** en `.npmrc`: npm falla si la versión de Node no coincide.
- **`npm install`** ejecuta `prepare` → `setup:git-hooks` que configura `.git-hooks/` automáticamente.
- **Mappers**: los controladores NO pasan DTOs directo a casos de uso — usan mappers estáticos (ej: `ProductMapper.fromCreateDto(dto)`).
- **Errores de dominio**: los use-cases lanzan errores custom (`ProductNotFoundError`), los controllers los capturan y lanzan `NotFoundException` HTTP.
- **Compodoc** disponible: `npm run compodoc:build` para documentación de código desde JSDoc.

---

## Notas para agentes IA

### Hacer

- Respetar la arquitectura hexagonal: la dirección de dependencias va `infrastructure → application → domain`.
- Cada **caso de uso** es una clase individual con un único método `execute()` (patrón Command), no servicios CRUD monolíticos.
- Nombrar los casos de uso como `kebab-case-operation.entity-name.use-case.ts` (ej: `create-product.use-case.ts`).
- Inyectar siempre por el **token** (`Symbol`), nunca por la clase concreta del adaptador.
- Mantener `domain/` libre de imports de NestJS o de cualquier adaptador.
- Escribir el test antes que la implementación (Strict TDD — ver WORKFLOW.md).
- Crear/actualizar `docs/<module>/<feature>.md` (OpenSpec) en el mismo cambio.
- Usar los path aliases (`@common`, `@products`, `@users`).
- Seguir Conventional Commits.

### No hacer

- No introducir un ORM, base de datos real ni librerías de persistencia sin acuerdo previo (los adaptadores actuales son in-memory por diseño).
- No mover lógica de negocio a controllers ni a service adapters; vive en `application/`.
- No romper el versionado de la API: nuevos endpoints van bajo `v1` (o una nueva versión explícita).
- No crear archivos `.md` extra para "documentar cambios" — usar `docs/<module>/<feature>.md` cuando aplique.
- No usar `it.only` / `describe.only` (ESLint lo bloquea).
- No deshabilitar reglas de ESLint sin justificación local.
- **NUNCA usar `--no-verify` para saltar el pre-commit hook.** Si el hook falla, se debe arreglar la causa raíz antes de commitear. Las violaciones del code review (GGA) son deuda técnica que se paga antes de avanzar, no se esquivan.
