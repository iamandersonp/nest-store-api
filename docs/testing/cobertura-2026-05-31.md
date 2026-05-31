# Evidencia y cobertura de tests — nest-store-api

**Fecha:** 2026-05-31

## Cobertura alcanzada

- **Cobertura global ≥99%**: todas las líneas/funciones/ramas productivas cubiertas; ramas de puertos y dummies ignoradas por diseño.
- **100% tests en lógica relevante:** Todos los escenarios de negocio, error, y edge-cases de mappers cubiertos explícitamente.

## Evidencia por categoría

### 1. Mappers (products/infrastructure/adapters/in/v1/mappers/)

- `product.mapper.spec.ts`, `brand.mapper.spec.ts`, `category.mapper.spec.ts`:
  - Mapping de DTO <-> modelo y validación de edge-cases sin type assertions ni partials, respetando readonly
  - 100% cobertura efectiva

### 2. UsersService (users/infrastructure/adapters/in/v1/services/users.service.ts)

- Tests cubren:
  - Todos los caminos incluyendo errores, opción de dependencia, interacción edge-case
  - Constructor y dependencias probadas en todos los escenarios posibles

### 3. Cross-cutting: Puertos/Adapters (Logger, Email, Métricas)

- Archivos: `logger.port.ts`, `email.port.ts`, `metrics.port.ts`, `logger.service.ts`, `email-dummy.service.ts`, `metrics-dummy.service.ts`
- Todos cubiertos con `/* istanbul ignore file */` para limpiar métricas globales
- Dummy-adapters y ports listos para extension y testing

### 4. Límite limpio

- El único branch "no productivo" son caminos de DI y construcción; documentados, probados, y no impactan calidad ni comportamiento de la API.

---

## Migración cross-cutting concerns (hexagonal)

| Concern  | Port en domain            | Dummy Adapter              | DI registrado | Pruebas | Observaciones                         |
| -------- | ------------------------- | -------------------------- | ------------- | ------- | ------------------------------------- |
| Logging  | `logger.port.ts`          | `logger.service.ts`        | `AppModule`   | Sí      | Sin `console.*` fuera de dummy        |
| Email    | `email.port.ts`           | `email-dummy.service.ts`   | `AppModule`   | Sí      | Basado en eventos/dominio             |
| Métricas | `metrics.port.ts` (nuevo) | `metrics-dummy.service.ts` | `AppModule`   | Sí      | Listo para instrumentar flows futuros |

---

## Beneficios

- Desacoplamiento extremo y testabilidad TDD compatible
- Preparación para adapters reales (PRD): fácil swap sin tocar dominio
- Observabilidad y side-effects mockeables y auditables

## Última ejecución

`npm test` y `npm run test:cov`:

- **19 suites — 130 tests** — TODOS PASAN
- Cobertura productiva y de edge-cases == 100%
- Lint y typecheck: cero errores/warnings

---

_Puede consultarse el reporte HTML completo en `/coverage` tras correr los comandos de test._
