# Stack Tecnológico

| Categoría         | Tecnología                                                           |
| ----------------- | -------------------------------------------------------------------- |
| Gestor de Node    | **nvm**                                                              |
| Runtime           | **Node 20.20** (npm `>=10 <11`)                                      |
| Framework         | NestJS **11** (`@nestjs/common`, `@nestjs/core`, `platform-express`) |
| Lenguaje          | TypeScript **5.7** — `target: ES2023`, `module: NodeNext`            |
| Configuración     | `@nestjs/config` (env tipado vía `EnvConfig`)                        |
| Validación        | `class-validator`, `class-transformer`                               |
| Documentación API | `@nestjs/swagger` (Swagger UI en `/api`, JSON en `/api/json`)        |
| HTTP cliente      | `@nestjs/axios`, `axios`                                             |
| Testing           | Jest **30** + `ts-jest`, Supertest para e2e                          |
| Lint / Format     | ESLint **9** (flat config, _type-checked_) + Prettier                |
| Docs de código    | Compodoc                                                             |
| Git hooks         | `.git-hooks/` (`pre-commit` con `prettier-staged`, `commit-msg`)     |
