# Testing with @nestjs/testing

## Unit Testing Use-Cases (REQUIRED)

```typescript
describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let port: { create: jest.Mock };

  beforeEach(async () => {
    port = { create: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        { provide: PRODUCTS_SERVICE_PORT, useValue: port }, // ✅ mock the PORT token
      ],
    }).compile();

    useCase = module.get(CreateProductUseCase);
  });

  it('should delegate create to the port', async () => {
    const payload = { name: 'Test', description: 'desc', price: 10, stock: 5, image: 'img' };
    port.create.mockResolvedValue({ id: 1, ...payload });
    await expect(useCase.execute(payload)).resolves.toEqual({ id: 1, ...payload });
    expect(port.create).toHaveBeenCalledWith(payload);
  });
});
```

**Rules:**

- Use `Test.createTestingModule` from `@nestjs/testing` — never `new up` the use-case directly
- Mock via the **port token**: `{ provide: TOKEN, useValue: mock }`
- `*.spec.ts` co-located with the file under test (same directory)
- Do NOT import real modules in unit tests — mock every port

## Test Structure Pattern

```
describe('UseCaseName', () => {
  let useCase: UseCaseType;
  let portMock: { methodName: jest.Mock };

  beforeEach(async () => { /* compile TestingModule */ });
  afterEach(() => { jest.clearAllMocks(); });

  describe('execute', () => {
    it('should ... when ...', async () => { /* test */ });
    it('should throw ... when ...', async () => { /* test */ });
  });
});
```

## Mocking the Right Thing

- **Unit tests:** Mock PORT tokens only. No real implementations.
- **Integration tests:** Use `compile()` with real modules but override specific providers.
- **E2E tests:** Use Supertest against a running app.

## E2E Tests

```typescript
// test/app.e2e-spec.ts
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('Products (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /v1/products', () => {
    return request(app.getHttpServer()).get('/v1/products').expect(200).expect([]);
  });
});
```

**Rules:**

- E2E tests in `test/` directory
- Uses Supertest's `request(app.getHttpServer())`
- `beforeAll` compiles the full AppModule once
- Tests endpoints end-to-end through the full stack

## Strict TDD Mode

This project uses **Strict TDD**. When implementing:

1. Write the test FIRST (it fails — Red)
2. Write minimal code to pass (Green)
3. Refactor (Refactor)

Test runner: `npm test` (Jest 30). See `skills/sdd-apply/SKILL.md` for the full TDD cycle.
