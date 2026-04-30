<p align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

# 🏛️ NestJS Hexagonal Architecture Project

Este proyecto está construido siguiendo los principios de la **Arquitectura Hexagonal** (Puertos y Adaptadores), priorizando el desacoplamiento de la lógica de negocio de los detalles técnicos.

---

## 📂 Estructura de Carpetas

La organización del código se divide por módulos de dominio y una capa común para utilidades compartidas:

```text
src/
├── common/                                                   # 🌍 Kernel Compartido (Shared Kernel)
│   ├── domain/
│   │   └── interfaces/
│   │       └── base-crud.interface.ts                        # Interfaz genérica BaseCrud
│   └── infrastructure/
│       └── filters/                                          # Filtros de excepción globales
│
├── products/                                                 # 📦 Módulo de Dominio (ej. Productos)
│   ├── application/                                          # 🔌 logica de Negocio
│   │   └── brand-use-case.service.ts                         # Case de Uso (Depende de Puertos)
│   │   └── category-use-case.service.ts                      # Case de Uso (Depende de Puertos)
│   │   └── product-use-case.service.ts                       # Case de Uso (Depende de Puertos)
│   │
│   ├── domain/                                               # 🧠 Corazón del Negocio (Puro TS)
│   │   ├── ports/
│   │   │   └── brand.port.ts                                 # Definición de Puertos y Tokens (Symbols)
│   │   │   └── category.port.ts                              # Definición de Puertos y Tokens (Symbols)
│   │   │   └─- product.port.ts                               # Definición de Puertos y Tokens (Symbols)
│   │   └-- models/
│   │       └── brand.entity.ts                               # Entidad de Dominio
│   │       └── category.entity.ts                            # Entidad de Dominio
│   │       └── product.entity.ts                             # Entidad de Dominio
│   │
│   ├── infrastructure/                                       # ⚙️ Adaptadores
│   │       └── adapters/
│   │            └── in/
│   │               └── v1/
│   │                    ├── services/
│   │                    │    └──- products.service.ts        # Implementación real (in memory array)
│   │                    │    └─-- categories.service.ts      # Implementación real (in memory array)
│   │                    │    └──- brands.service.ts          # Implementación real (in memory array)
│   │                    ├─── dtos/
│   │                    │    └─── products.dto.ts            # DTOs de entrada
│   │                    │    └─── categories.dto.ts          # DTOs de entrada
│   │                    │    └─── brands.dto.ts.             # DTOs de entrada
│   │                    └── controllers/
│   │                         └──- brands.controller.ts       # Controlador (Depende de Use case)
│   │                         └──- categories.controller.ts   # Controlador (Depende de Use case)
│   │                         └──- products.controller.ts     # Controlador (Depende de Use case)
│   │
│   ├── products.module.ts                                    # 🧩 Punto de unión (DI Container)
│   │
├── users/                                                    # 📦 Módulo de Dominio (ej. Productos)
│   ├── application/                                          # 🔌 logica de Negocio
│   │   └── customer-use-case.service.ts                      # Case de Uso (Depende de Puertos)
│   │   └── user-use-case.service.ts                          # Case de Uso (Depende de Puertos)
│   │
│   ├── domain/                                               # 🧠 Corazón del Negocio (Puro TS)
│   │   ├── ports/
│   │   │   └── customer.port.ts                              # Definición de Puertos y Tokens (Symbols)
│   │   │   └── user.port.ts                                  # Definición de Puertos y Tokens (Symbols)
│   │   └-- models/
│   │       └── customer.entity.ts                            # Entidad de Dominio
│   │       └── user.entity.ts                                # Entidad de Dominio
│   │
│   ├── infrastructure/                                       # ⚙️ Adaptadores
│   │       └── adapters/
│   │            └── in/
│   │               └── v1/
│   │                    ├── services/
│   │                    │    └── customer.service.ts         # Implementación real (in memory array)
│   │                    │    └─- user.service.ts             # Implementación real (in memory array)
│   │                    ├─── dtos/
│   │                    │    └─── customers.dto.ts           # DTOs de entrada
│   │                    │    └─── users.dto.ts               # DTOs de entrada
│   │                    └── controllers/
│   │                         └── customers.controller.ts     # Controlador (Depende de Use case)
│   │                         └── users.controller.ts         # Controlador (Depende de Use case)
│   │
│   ├── users.module.ts                                       # 🧩 Punto de unión (DI Container)
│
├── app.module.ts                                             # Módulo raíz
└── main.ts                                                   # Punto de entrada de la aplicación
```

## Project setup

```bash
npm install
```

## Compile and run the project

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Run tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
