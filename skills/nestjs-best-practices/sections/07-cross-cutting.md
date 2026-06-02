# Cross-Cutting Concerns

## Logger Port (REQUIRED)

```typescript
// common/domain/ports/logger.port.ts
export interface LoggerPort {
  info(message: string, context?: string): void;
  warn(message: string, context?: string): void;
  error(message: string, trace?: string, context?: string): void;
}

export const LOGGER_PORT = Symbol('LOGGER_PORT');
```

**Rules:**

- Logger is ALWAYS injected through the port, never `console.log` directly
- Implemented via `ConsoleLoggerService` in infrastructure
- `/* istanbul ignore file */` on the dummy implementation — no real logic to test

## ConfigModule (REQUIRED)

```typescript
// main.ts — typed env interface
export interface EnvConfig {
  PORT: number;
  NODE_ENV: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
}
```

```typescript
// Access typed env vars
const port = configService.get<number>('PORT', { infer: true });
```

**Rules:**

- `ConfigModule.forRoot({ isGlobal: true })` — registered once in `AppModule`
- Always type env vars via an interface
- NEVER use `process.env` directly — always through `ConfigService`

## Swagger / OpenAPI

### Bootstrap Setup

```typescript
const config = new DocumentBuilder()
  .setTitle('Store example')
  .setDescription('A store created with NestJs')
  .setVersion('1.0')
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, documentFactory, { jsonDocumentUrl: 'api/json' });
```

**Basic rules:**

- `PartialType` comes from `@nestjs/swagger` (not `@nestjs/mapped-types`)
- Swagger at `/api`, JSON spec at `/api/json`

### CLI Plugin (already in use)

This project has the Swagger plugin enabled in `nest-cli.json`:

```json
"plugins": ["@nestjs/swagger"]
```

The plugin **automatically** generates `@ApiProperty()` decorators from TypeScript types + JSDoc comments, so DTOs like these produce a complete OpenAPI schema without any Swagger decorators:

```typescript
// ✅ Plugin auto-generates @ApiProperty() from types + JSDoc
export class CreateProductsDto {
  /** The product name */
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  /** Price in USD */
  @IsNumber()
  @IsPositive()
  readonly price!: number;
}
```

**What the plugin handles automatically:**

- Property types (`string`, `number`, `boolean`, etc.)
- Required vs optional (from `!` / `?`)
- Array types
- Descriptions (from JSDoc `/** ... */`)
- Enums

### Manual Decorators (for edge cases)

Add explicit `@ApiProperty()` ONLY when the plugin can't infer correctly:

| Case                   | Decorator                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------- |
| Override description   | `@ApiProperty({ description: '...' })`                                                  |
| Override type          | `@ApiProperty({ type: Number })`                                                        |
| Array type ambiguity   | `@ApiProperty({ type: [String] })`                                                      |
| Optional property      | `@ApiPropertyOptional()`                                                                |
| Enum type              | `@ApiProperty({ enum: ['Admin', 'User'] })`                                             |
| Reusable enum schema   | `@ApiProperty({ enum: UserRole, enumName: 'UserRole' })`                                |
| Circular dependency    | `@ApiProperty({ type: () => Node })`                                                    |
| Property example       | `@ApiProperty({ example: 'persian' })`                                                  |
| Multiple examples      | `@ApiProperty({ examples: { Fast: { value: 10 }, Slow: { value: 1 } } })`               |
| Nested arrays/matrices | `@ApiProperty({ type: 'array', items: { type: 'array', items: { type: 'number' } } })`  |
| oneOf / anyOf / allOf  | `@ApiProperty({ oneOf: [{ $ref: getSchemaPath(Cat) }, { $ref: getSchemaPath(Dog) }] })` |
| Custom schema name     | `@ApiSchema({ name: 'CreateCatRequest' })`                                              |
| Schema description     | `@ApiSchema({ description: '...' })`                                                    |

```typescript
// ✅ Manual — enums need explicit hint
@ApiProperty({ enum: UserRole, enumName: 'UserRole' })
role: UserRole;

// ✅ Manual — override auto-detected type
@ApiProperty({ type: [String] })
tags: string[];
```

> ⚠️ **Don't add `@ApiProperty()` everywhere.** The plugin covers ~95% of cases. Add it only when the generated schema is wrong.

### Endpoint & Parameter Decorators

| Decorator                                               | When to use                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------- |
| `@ApiTags('products')`                                  | Group endpoints in Swagger UI — one per controller class       |
| `@ApiOperation({ summary: '...', description: '...' })` | Describe the endpoint's purpose                                |
| `@ApiBody({ type: CreateDto })`                         | Explicit body definition (rare — auto-detected from `@Body()`) |
| `@ApiParam({ name: 'id', type: Number })`               | Path parameter documentation                                   |
| `@ApiQuery({ name: 'role', enum: UserRole })`           | Query parameter documentation (for non-DTO queries)            |
| `@ApiResponse({ status: 201, description: 'Created' })` | Generic response description                                   |
| `@ApiOkResponse({ type: Product })`                     | 200 response with type                                         |
| `@ApiCreatedResponse({ type: Product })`                | 201 response with type                                         |
| `@ApiBearerAuth()`                                      | Endpoint requires JWT auth (for future use)                    |

**Example — documented controller:**

```typescript
@ApiTags('products')
@Controller({ path: 'products', version: '1' })
export class ProductsController {
  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiCreatedResponse({ type: Product, description: 'Product created successfully' })
  create(@Body() payload: CreateProductsDto) {
    return this.createProductUseCase.execute(payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiOkResponse({ type: Product })
  @ApiNotFoundResponse({ description: 'Product not found' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.findOneProductUseCase.execute(id);
  }
}
```

### Extra Models & Polymorphics

When DTOs reference types not directly exposed in controllers:

```typescript
@ApiExtraModels(Cat, Dog)
export class CreatePetDto {
  @ApiProperty({
    oneOf: [{ $ref: getSchemaPath(Cat) }, { $ref: getSchemaPath(Dog) }],
  })
  pet: Cat | Dog;
}
```

Or register globally in main.ts:

```typescript
const documentFactory = () =>
  SwaggerModule.createDocument(app, config, {
    extraModels: [ExtraModel],
  });
```

### Bulk / Array Parameters

The Swagger plugin may not detect generic types or arrays at runtime:

```typescript
// ❌ Plugin may miss the array type
createBulk(@Body() usersDto: CreateUserDto[])

// ✅ Explicit hint
@ApiBody({ type: [CreateUserDto] })
createBulk(@Body() usersDto: CreateUserDto[])
```

### Config Summary (REQUIRED)

- Plugin auto-generates decorators — only add manual `@ApiProperty()` when the result is wrong
- `@ApiTags()` on every controller
- `@ApiOperation()` on non-obvious endpoints
- `@ApiOkResponse()` / `@ApiCreatedResponse()` / `@ApiNotFoundResponse()` for status + type hints
- `PartialType` from `@nestjs/swagger` (not `@nestjs/mapped-types`)
- `getSchemaPath()` imported from `@nestjs/swagger`

## Bootstrap (REQUIRED)

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 2. URI versioning
  app.enableVersioning({ type: VersioningType.URI, prefix: 'v', defaultVersion: '1' });

  // 3. CORS (configure as needed)
  app.enableCors();

  // 4. Swagger
  const config = new DocumentBuilder()
    .setTitle('Store example')
    .setDescription('A store created with NestJs')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, { jsonDocumentUrl: 'api/json' });

  // 5. Listen
  await app.listen(configService.get('PORT', { infer: true }) || 3000);
}
```

**Order matters:** Validation pipe must be registered before versioning, versioning before Swagger.

## Path Aliases

Configured in `tsconfig.json`:

```typescript
import { LoggerPort } from '@common/domain/ports/logger.port'; // ✅
import { ProductsService } from '@products/infrastructure/...'; // ✅
import { User } from '../../../users/domain/models/user.model'; // ❌ relative across modules
```

**Rule:** Use path aliases (`@common/*`, `@products/*`, `@users/*`) for cross-module imports. Relative imports only within the same module.

## Graceful Shutdown

```typescript
const app = await NestFactory.create(AppModule, { abortOnError: false });
app.enableShutdownHooks(); // SIGTERM / SIGINT cleanup
```

## JSDoc Convention (REQUIRED)

Every public class, method, and DTO/entity property MUST have JSDoc:

```typescript
/**
 * Product id
 * @type {number}
 * @memberof Products
 */
id: number;

/**
 * Find one product by id
 * @param {number} id - Product identifier
 * @return {*} {Product}
 * @memberof ProductsService
 */
findOne(id: number): Product { ... }
```

## Security Baseline (for future)

When adding auth/security:

- CORS enabled via `app.enableCors()` with explicit origin whitelist
- Use `helmet` for HTTP header security
- Rate limiting via `@nestjs/throttler`
- Auth via Guards (JWT or session) — never in use-cases
- DTO validation is the first line of defense against injection
- `ValidationPipe` with `forbidNonWhitelisted` prevents parameter pollution
