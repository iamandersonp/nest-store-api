# AGENTS.md

Guía operativa para agentes de IA (y humanos) que trabajen en **nest-store-api**. Documenta el stack, la arquitectura hexagonal, las convenciones de código y los flujos esperados al añadir o modificar features.

> ℹ️ Para una descripción más narrativa del proyecto, ver [README.md](./README.md).

---

## 1. Resumen del proyecto

API tipo _store_ construida con **NestJS** siguiendo **Arquitectura Hexagonal (Puertos y Adaptadores)**. La lógica de negocio (use-cases) vive en `application/`, desacoplada de los adaptadores HTTP/persistencia mediante puertos definidos en `domain/`. Actualmente los adaptadores de salida son implementaciones _in-memory_; la API se expone por HTTP versionada en `/v1`.

---

## 2. Stack tecnológico

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

---

## 3. Estructura de carpetas

```text
src/
├── common/                      # 🌍 Shared kernel
│   └── domain/
│       └── interfaces/
│           ├── base-crud.interface.ts   # Contrato genérico CRUD
│           └── env-config.ts            # Tipado de variables de entorno
│
├── products/                    # 📦 Módulo de dominio
│   ├── application/             # 🔌 Casos de uso (lógica de negocio)
│   │   ├── brand-use-case.service.ts
│   │   ├── category-use-case.service.ts
│   │   └── product-use-case.service.ts
│   ├── domain/                  # 🧠 Núcleo puro
│   │   ├── models/              # Entidades de dominio (interfaces TS)
│   │   └── ports/               # Tokens DI (Symbol) + contratos
│   ├── infrastructure/
│   │   └── adapters/in/v1/      # Adaptadores de entrada versionados
│   │       ├── controllers/
│   │       ├── dtos/
│   │       └── services/        # Implementación de los puertos
│   └── products.module.ts       # 🧩 Cableado DI del módulo
│
├── users/                       # Mismo patrón que products
│
├── app.module.ts
└── main.ts                      # Bootstrap, ValidationPipe global, Swagger, versioning
test/                            # Tests e2e
docs/<module>/<feature>.md       # Especificación OpenSpec por feature
```

### Path aliases (`tsconfig.json`)

- `@common/*` → `src/common/*`
- `@products/*` → `src/products/*`
- `@users/*` → `src/users/*`

---

## 4. Arquitectura hexagonal

Flujo de una request:

```text
HTTP ──▶ Controller ──▶ UseCaseService ──▶ Port (Symbol) ──▶ Service Adapter
        (infrastructure)  (application)    (domain)         (infrastructure)
```

Reglas:

1. **`domain/`** es TypeScript puro. No importa nada de NestJS ni de adaptadores.
2. **`application/`** depende **únicamente** de `domain/` (entidades + puertos) y de DTOs de entrada.
3. **`infrastructure/`** implementa los puertos y expone adaptadores HTTP. Puede importar `domain/` y DTOs propios.
4. Los **puertos** se declaran como `InjectionToken` (`Symbol`) y se inyectan con `@Inject(TOKEN)`.
5. El **module** cablea `provide: TOKEN, useClass: ServiceImpl` y exporta los use-cases si otros módulos los necesitan.

Ejemplo canónico ([src/products/products.module.ts](src/products/products.module.ts)):

```ts
@Module({
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [
    ProductUseCaseService,
    { provide: PRODUCTS_SERVICE_PORT, useClass: ProductsService },
    // ...
  ],
  exports: [ProductUseCaseService /* ... */],
})
export class ProductsModule {}
```

Contrato base reutilizable ([src/common/domain/interfaces/base-crud.interface.ts](src/common/domain/interfaces/base-crud.interface.ts)):

```ts
export interface BasseCrudService<T, C extends object, U extends object> {
  findAll(): T[] | Promise<T[]>;
  findOne(id: number): T | Promise<T>;
  create(payload: C): T | Promise<T>;
  update(id: number, payload: U): T | Promise<T>;
  delete(id: number): void | Promise<void>;
}
```

---

## 5. Convenciones de código

### Naming de archivos

| Tipo               | Patrón                  | Ubicación                                             |
| ------------------ | ----------------------- | ----------------------------------------------------- |
| Entidad de dominio | `*.entity.ts`           | `<module>/domain/models/`                             |
| Puerto / token DI  | `*.port.ts`             | `<module>/domain/ports/`                              |
| Caso de uso        | `*-use-case.service.ts` | `<module>/application/`                               |
| Controlador HTTP   | `*.controller.ts`       | `<module>/infrastructure/adapters/in/v1/controllers/` |
| Service adapter    | `*.service.ts`          | `<module>/infrastructure/adapters/in/v1/services/`    |
| DTO                | `*.dto.ts`              | `<module>/infrastructure/adapters/in/v1/dtos/`        |
| Test unitario      | `*.spec.ts`             | Junto al archivo bajo prueba                          |
| Test e2e           | `*.e2e-spec.ts`         | `test/`                                               |
| Módulo Nest        | `<module>.module.ts`    | Raíz del módulo                                       |

### DTOs

- Usar `class-validator` (`@IsString`, `@IsNumber`, `@IsPositive`, `@IsUrl`, etc.).
- Propiedades `readonly` con `!` (definite assignment).
- `UpdateXxxDto extends PartialType(CreateXxxDto)` desde **`@nestjs/swagger`** (no desde `@nestjs/mapped-types`).

### Controllers

- `@Controller({ path: 'recurso', version: '1' })` (versionado URI activado en `main.ts`).
- Usar `ParseIntPipe` para params numéricos.
- Documentar cada método con JSDoc (estilo Compodoc: `@param`, `@return`, `@memberof`).

### Tokens DI

```ts
export const PRODUCTS_SERVICE_PORT: InjectionToken = Symbol('PRODUCTS_SERVICE_PORT');
```

Nombres en `SCREAMING_SNAKE_CASE` con sufijo `_PORT`.

### Pipes globales

`main.ts` aplica `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })`. No reimplementar validación manual en controllers.

### Estilo Prettier ([.prettierrc](.prettierrc))

- `singleQuote: true`
- `trailingComma: 'all'`
- `printWidth: 100`
- `endOfLine: 'lf'`
- `semi: true`
- `tabWidth: 2`

### ESLint

- Config flat type-checked (`tseslint.configs.recommendedTypeChecked`).
- Reglas relajadas en `*.spec.ts` para permitir mocks (`no-unsafe-*`, `unbound-method` desactivadas).
- `jest/no-focused-tests` y `jest/no-conditional-expect` son **errores**.

### TDD obligatorio

Seguir siempre el ciclo **Red → Green → Refactor**:

1. **Red**: escribir un `*.spec.ts` que falle describiendo el comportamiento deseado.
2. **Green**: implementar el mínimo código para que pase.
3. **Refactor**: limpiar manteniendo los tests verdes.

Aplica a use-cases, controllers y service adapters. No abrir PR sin tests que cubran el cambio.

### Conventional Commits

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

### Documentación de features (OpenSpec)

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

### JSDoc

Todas las clases públicas, métodos y propiedades de DTOs/entidades llevan JSDoc con `@param`, `@return`, `@type`, `@memberof`. Compodoc consume estos comentarios.

---

## 6. Comandos clave

```bash
# Setup
nvm use                       # respeta .nvmrc / engines.node = 20.20
npm install                   # ejecuta también `setup:git-hooks`

# Desarrollo
npm run start:dev             # watch mode
npm run start:debug
npm run start                 # sin watch
npm run start:prod            # node dist/main

# Build
npm run build

# Calidad
npm run lint                  # eslint --fix sobre src/, apps/, libs/, test/
npm run format                # prettier --write

# Tests
npm test                      # unit
npm run test:watch
npm run test:cov              # coverage
npm run test:e2e              # jest config en test/jest-e2e.json

# Documentación
npm run compodoc:build
npm run compodoc:build-and-serve
```

---

## 7. Testing

- **TDD** como práctica por defecto (ver §5).
- Patrón estándar con `Test.createTestingModule`:

  ```ts
  const module: TestingModule = await Test.createTestingModule({
    controllers: [ProductsController],
    providers: [ProductUseCaseService, { provide: PRODUCTS_SERVICE_PORT, useValue: mockService }],
  }).compile();
  ```

- Mockear el **puerto** (token), no la implementación concreta.
- `*.spec.ts` colocados junto al archivo bajo prueba.
- E2E en `test/` con Supertest.

---

## 8. Cómo añadir un nuevo recurso

Checklist en orden (TDD primero):

1. **`<feature>.spec.ts` del use-case** que falle describiendo el comportamiento deseado _(Red)_.
2. **Entidad** en `<module>/domain/models/<name>.entity.ts`.
3. **Puerto** en `<module>/domain/ports/<name>.port.ts` (`Symbol` `_PORT`).
4. **DTOs** (`Create*Dto`, `Update*Dto extends PartialType`) en `infrastructure/.../dtos/`.
5. **Use-case** en `application/<name>-use-case.service.ts` (`@Inject(PORT)`).
6. **Service adapter** que implemente `BasseCrudService<T, C, U>` (o un contrato propio si aplica).
7. **Controller** versionado (`version: '1'`).
8. **Registrar** en el `*.module.ts`: controller en `controllers`, use-case y `{ provide: PORT, useClass }` en `providers`, exportar use-case si otros módulos lo consumen.
9. Hacer pasar los tests _(Green)_ y refactorizar _(Refactor)_.
10. **Documentar la feature** en `docs/<module>/<feature>.md` siguiendo OpenSpec.
11. Commits siguiendo Conventional Commits.

---

## 9. Configuración

- Variables de entorno tipadas en [src/common/domain/interfaces/env-config.ts](src/common/domain/interfaces/env-config.ts):
  `PORT`, `NODE_ENV`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`.
- `ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })` en [src/app.module.ts](src/app.module.ts).
- Acceso: `configService.get('PORT', { infer: true })`.

---

## 10. Notas para agentes IA

**Hacer:**

- Respetar la arquitectura hexagonal: la dirección de dependencias va `infrastructure → application → domain`.
- Inyectar siempre por el **token** (`Symbol`), nunca por la clase concreta del adaptador.
- Mantener `domain/` libre de imports de NestJS o de cualquier adaptador.
- Escribir el test antes que la implementación (TDD).
- Crear/actualizar `docs/<module>/<feature>.md` (OpenSpec) en el mismo cambio.
- Usar los path aliases (`@common`, `@products`, `@users`).
- Seguir Conventional Commits.

**No hacer:**

- No introducir un ORM, base de datos real ni librerías de persistencia sin acuerdo previo (los adaptadores actuales son in-memory por diseño).
- No mover lógica de negocio a controllers ni a service adapters; vive en `application/`.
- No romper el versionado de la API: nuevos endpoints van bajo `v1` (o una nueva versión explícita).
- No crear archivos `.md` extra para "documentar cambios" salvo que el usuario lo pida — usar `docs/<module>/<feature>.md` cuando aplique.
- No usar `it.only` / `describe.only` (ESLint lo bloquea).
- No deshabilitar reglas de ESLint sin justificación local.
