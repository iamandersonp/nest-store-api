# Testing

## Estrategia

El proyecto sigue **TDD** como práctica por defecto. Ver [WORKFLOW.md](./WORKFLOW.md) para el ciclo Red/Green/Refactor detallado.

## Comandos

```bash
npm test              # Tests unitarios
npm run test:watch    # Watch mode
npm run test:cov      # Coverage
npm run test:e2e      # Tests e2e (Jest + Supertest)
```

## Patrón estándar con NestJS

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductUseCaseService } from '@products/application/product-use-case.service';
import { PRODUCTS_SERVICE_PORT } from '@products/domain/ports/product.port';

describe('ProductsController', () => {
  let controller: ProductsController;
  let mockService: jest.Mocked<Partial<ProductsService>>;

  beforeEach(async () => {
    mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductUseCaseService,
        { provide: PRODUCTS_SERVICE_PORT, useValue: mockService },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
```

## Reglas

- Mockear el **puerto** (token), no la implementación concreta.
- `*.spec.ts` colocado junto al archivo bajo prueba.
- E2E en `test/` con Supertest.
- No usar `it.only` / `describe.only` (ESLint lo bloquea como error).
