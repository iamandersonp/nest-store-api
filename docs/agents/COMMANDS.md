# Comandos clave

## Setup

```bash
nvm use                       # respeta .nvmrc / engines.node = 20.20
npm install                   # ejecuta también `setup:git-hooks`
```

## Desarrollo

```bash
npm run start:dev             # watch mode
npm run start:debug
npm run start                 # sin watch
npm run start:prod            # node dist/main
```

## Build

```bash
npm run build
```

## Calidad

```bash
npm run lint                  # eslint --fix sobre src/, apps/, libs/, test/
npm run format                # prettier --write
```

## Tests

```bash
npm test                      # unit
npm run test:watch
npm run test:cov              # coverage
npm run test:e2e              # jest config en test/jest-e2e.json
```

## Documentación

```bash
npm run compodoc:build
npm run compodoc:build-and-serve
```
