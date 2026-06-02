# Flujos de trabajo

## SDD (Spec-Driven Development)

Este proyecto utiliza **SDD** como proceso de desarrollo. Todos los cambios significativos pasan por el ciclo:

```text
explore → propose → spec → design → tasks → apply → verify → archive
```

### Comandos SDD

| Comando                      | Propósito                                                |
| ---------------------------- | -------------------------------------------------------- |
| `/sdd-init`                  | Inicializa SDD para el proyecto                          |
| `/sdd-new <change>`          | Arranca un cambio nuevo (exploración + proposal)         |
| `/sdd-ff <name>`             | Fast-forward: proposal → spec → design → tasks           |
| `/sdd-explore <topic>`       | Investigar una idea sin crear archivos                   |
| `/sdd-apply [change]`        | Implementar tareas en lotes                              |
| `/sdd-verify [change]`       | Validar que la implementación cumple las specs           |
| `/sdd-archive [change]`      | Cerrar un cambio y persistir estado final                |
| `/sdd-continue [change]`     | Continuar con la siguiente fase lista                    |

### Fases del ciclo

1. **explore**: Investigar el código actual, comparar enfoques, sin crear archivos.
2. **propose**: Definir intención, alcance y approach del cambio.
3. **spec**: Escribir requisitos delta con escenarios Given/When/Then.
4. **design**: Diseño técnico con tradeoffs y decisiones arquitectónicas.
5. **tasks**: Desglosar en tareas implementables, estimar líneas modificadas.
6. **apply**: Implementar cada tarea siguiendo **Strict TDD** (ver abajo).
7. **verify**: Ejecutar tests y probar que el código cumple las specs.
8. **archive**: Sincronizar specs y persistir estado final.

## Strict TDD

El proyecto tiene `strict_tdd: true` configurado en `openspec/config.yaml`. Esto significa que durante la fase **apply** se sigue estrictamente el ciclo:

### Red → Green → Refactor

1. **Red**: Escribir el `*.spec.ts` que falle describiendo el comportamiento deseado. El test debe ejecutarse y FALLAR antes de escribir código de producción.
2. **Green**: Implementar el mínimo código necesario para que el test pase.
3. **Refactor**: Limpiar y mejorar el código manteniendo los tests verdes.

### Reglas de Strict TDD

- No se escribe código de producción sin un test que falle primero.
- Cada commit debe dejar los tests pasando (`npm test`).
- Los tests deben ejecutarse después de CADA cambio significativo.
- No se puede saltar la fase Red: escribir el test después del código viola strict TDD.
- Los mocks se hacen sobre el **puerto** (token), no sobre la implementación concreta.

### Cuándo aplica

Strict TDD aplica a:
- Use-cases (`application/*-use-case.ts`)
- Controllers (`infrastructure/.../controllers/*.controller.ts`)
- Service adapters (`infrastructure/.../services/*.service.ts`)

## Cómo agregar un nuevo recurso

Checklist en orden (TDD + SDD):

1. Iniciar un cambio SDD: `/sdd-new add-<recurso>` o `/sdd-ff add-<recurso>` si el alcance está claro.
2. Define la entidad en `<module>/domain/models/<name>.entity.ts`.
3. Define el puerto en `<module>/domain/ports/<name>.port.ts` (`Symbol` `_PORT`).
4. Escribe los DTOs (`Create*Dto`, `Update*Dto extends PartialType`) en `infrastructure/.../dtos/`.
5. Escribe el test del use-case **primero** (Red) → implementa el use-case `application/<name>-use-case.ts` (Green).
6. Escribe el test del service adapter **primero** (Red) → implementa el adapter (Green).
7. Escribe el test del controller **primero** (Red) → implementa el controller versionado (Green).
8. Registra en `*.module.ts`: controller en `controllers`, use-case y `{ provide: PORT, useClass }` en `providers`.
9. Refactoriza manteniendo tests verdes.
10. Documenta la feature en `docs/<module>/<feature>.md` siguiendo OpenSpec.
11. Commits siguiendo Conventional Commits.
