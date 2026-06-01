# Configuración del proyecto

## Variables de entorno

Tipadas en [src/common/domain/interfaces/env-config.ts](src/common/domain/interfaces/env-config.ts):

| Variable       | Descripción         |
| -------------- | ------------------- |
| `PORT`         | Puerto del servidor |
| `NODE_ENV`     | Entorno             |
| `DB_NAME`      | Nombre de BD        |
| `DB_USER`      | Usuario de BD       |
| `DB_PASSWORD`  | Password de BD      |
| `DB_HOST`      | Host de BD          |
| `DB_PORT`      | Puerto de BD        |

## Carga

`ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })` en `src/app.module.ts`.

Acceso: `configService.get('PORT', { infer: true })`.

## OpenSpec config

El archivo `openspec/config.yaml` define:

- `strict_tdd: true` — modo TDD estricto habilitado
- Comandos de test: `npm test` (unit), `npm run test:e2e` (e2e)
- Comandos de calidad: `npm run lint`, `npm run format`
