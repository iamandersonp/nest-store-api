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
├── common/                            # 🌍 Kernel Compartido (Shared Kernel)
│   ├── domain/
│   │   └── interfaces/
│   │       └── base-crud.interface.ts # Interfaz genérica IBaseCrud
│   └── infrastructure/
│       └── filters/                   # Filtros de excepción globales
│
├── products/                          # 📦 Módulo de Dominio (ej. Productos)
│   ├── application/                   # 🔌 Adaptadores de Entrada
│   │   └── products.controller.ts     # Controlador (Depende de Puertos)
│   │
│   ├── domain/                        # 🧠 Corazón del Negocio (Puro TS)
│   │   ├── ports/
│   │   │   └── product.port.ts        # Definición de Puertos y Tokens (Symbols)
│   │   │   └── category.port.ts       # Definición de Puertos y Tokens (Symbols)
│   │   │   └── brand.port.ts          # Definición de Puertos y Tokens (Symbols)
│   │   ├── models/
│   │   │   └── product.entity.ts      # Entidad de Dominio
│   │   │   └── category.entity.ts     # Entidad de Dominio
│   │   │   └── brand.entity.ts        # Entidad de Dominio
│   │   └── dtos/
│   │       └── products.dto.ts        # DTOs de entrada
│   │       └── categories.dto.ts      # DTOs de entrada
│   │       └── brands.dto.ts.         # DTOs de entrada
│   │
│   ├── infrastructure/                # ⚙️ Adaptadores de Salida
│   │   └── in-memory/
│   │       └── products.service.ts    # Implementación real (in memory array)
│   │       └── categories.service.ts  # Implementación real (in memory array)
│   │       └── brands.service.ts      # Implementación real (in memory array)
│   │
│   └── products.module.ts             # 🧩 Punto de unión (DI Container)
│
├── users/                             # 📦 Módulo de Dominio (ej. Users)
│   ├── application/                   # 🔌 Adaptadores de Entrada
│   │   └── users.controller.ts.       # Controlador (Depende de Puertos)
│   │   └── customers.controller.ts.   # Controlador (Depende de Puertos)
│   │   └── orders.controller.ts.      # Controlador (Depende de Puertos)
│   │
│   ├── domain/                        # 🧠 Corazón del Negocio (Puro TS)
│   │   ├── ports/
│   │   │   └── user.port.ts           # Definición de Puertos y Tokens (Symbols)
│   │   │   └── customer.port.ts       # Definición de Puertos y Tokens (Symbols)
│   │   ├── models/
│   │   │   └── user.entity.ts         # Entidad de Dominio
│   │   │   └── customer.entity.ts     # Entidad de Dominio
│   │   │   └── order.entity.ts        # Entidad de Dominio
│   │   └── dtos/
│   │       └── user.dto.ts.          # DTOs de entrada
│   │       └── customer.dto.ts       # DTOs de entrada
│   │       └── order.dto.ts.         # DTOs de entrada
│   │
│   ├── infrastructure/                # ⚙️ Adaptadores de Salida
│   │   └── in-memory/
│   │       └── user.service.ts        # Implementación real (in memory array)
│   │       └── customer.service.ts    # Implementación real (in memory array)
│   │       └── order.service.ts       # Implementación real (in memory array)
│   │
│   └── user.module.ts                 # 🧩 Punto de unión (DI Container)
│├── app.module.ts                     # Módulo raíz
└── main.ts                            # Punto de entrada de la aplicación
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
