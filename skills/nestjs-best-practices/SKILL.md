---
name: nestjs-best-practices
description: 'Trigger: NestJS, module, controller, use-case, DTO, provider, DI, guard, pipe, interceptor, hexagonal, versioning, swagger. NestJS best practices for nest-store-api.'
license: Apache-2.0
metadata:
  author: 'Anderson E. Peñaloza C. <info@iamanderson.dev>'
  version: '1.0'
  scope: [root, domain, application, infrastructure]
  auto_invoke: 'Writing NestJS modules, controllers, providers, DTOs, use-cases, or tests'
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

# NestJS Best Practices — nest-store-api

This skill is split into focused sections. Load the relevant section(s) based on what you're working on.

## Sections

| #   | File                                                                         | When to load                                                |
| --- | ---------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 1   | [sections/01-architecture.md](./sections/01-architecture.md)                 | Creating modules, defining folder structure, wiring modules |
| 2   | [sections/02-dependency-injection.md](./sections/02-dependency-injection.md) | Writing providers, ports, injection tokens                  |
| 3   | [sections/03-controllers-dtos.md](./sections/03-controllers-dtos.md)         | Building controllers, DTOs, validation, versioning          |
| 4   | [sections/04-use-cases.md](./sections/04-use-cases.md)                       | Writing per-operation use cases, application logic          |
| 5   | [sections/05-testing.md](./sections/05-testing.md)                           | Unit/integration tests, E2E, mocking ports                  |
| 6   | [sections/06-error-handling.md](./sections/06-error-handling.md)             | Domain errors, exception filters, HTTP mapping              |
| 7   | [sections/07-cross-cutting.md](./sections/07-cross-cutting.md)               | Logger, ConfigModule, Swagger, bootstrap, JSDoc             |

## Load Order (when loading the full skill)

Load sections **1 + 2** always. Then load the section(s) matching your current task.

## Companion Skill

Load alongside: [typescript-strict](../typescript-strict/SKILL.md) — strict TS rules apply to all files.

## References

- `src/main.ts` — bootstrap, ValidationPipe, versioning, Swagger
- `src/app.module.ts` — root module wiring
- `src/products/products.module.ts` — canonical module example
- `docs/agents/ARCHITECTURE.md` — hexagonal structure and flow
- `docs/agents/CONVENTIONS.md` — naming, DTOs, DI, JSDoc
- `docs/agents/TESTING.md` — testing patterns with @nestjs/testing
