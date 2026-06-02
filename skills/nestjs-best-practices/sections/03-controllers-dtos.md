# Controllers, DTOs & Versioning

## Versioned Controllers (REQUIRED)

```typescript
@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly findOneProductUseCase: FindOneProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Get()
  getAll(): User[] | Promise<User[]> {
    return this.findAllProductsUseCase.execute();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): User | Promise<User> {
    return this.findOneProductUseCase.execute(id);
  }

  @Post()
  create(@Body() payload: CreateProductsDto): User | Promise<User> {
    return this.createProductUseCase.execute(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductsDto) {
    return this.updateProductUseCase.execute(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): void | Promise<void> {
    return this.deleteProductUseCase.execute(id);
  }
}
```

**Rules:**

- Version via `@Controller({ path, version: '1' })` — URI versioning is enabled globally (`/v1/products`)
- `ParseIntPipe` for all numeric `@Param()` — validates + transforms
- `@HttpCode(HttpStatus.NO_CONTENT)` on DELETE (204)
- Controllers delegate to use-cases — ZERO business logic here
- Compose what the endpoint needs via constructor — each use-case is one dependency

## DTOs (REQUIRED)

```typescript
import { PartialType } from '@nestjs/swagger'; // ✅ from @nestjs/swagger
import { IsString, IsNumber, IsPositive, IsUrl, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductsDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsNumber()
  @IsPositive()
  readonly price!: number;

  @IsOptional()
  @IsUrl()
  readonly image?: string;
}

// Update extends PartialType — ✅ from @nestjs/swagger, ❌ NOT from @nestjs/mapped-types
export class UpdateProductsDto extends PartialType(CreateProductsDto) {}
```

**Rules:**

- Properties: `readonly` with definite assignment (`!`)
- `UpdateDto extends PartialType(CreateDto)` — always from `@nestjs/swagger`
- Validation decorators on ALL fields (`@IsString`, `@IsNumber`, etc.)
- `@IsOptional()` for nullable fields
- Do NOT put DTOs in `domain/` — they are HTTP concerns, live in `infrastructure/adapters/in/v1/dtos/`

## Validation Pipeline

Configured once in `main.ts`:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // strips unknown properties
    forbidNonWhitelisted: true, // rejects requests with unknown props
    transform: true, // auto-transform types (string "1" → number 1)
  }),
);
```

This is global — every DTO is automatically validated. No manual validation in controllers.

## Mappers

When domain models differ from DTO shapes, use explicit mapper functions:

```typescript
// infrastructure/adapters/in/v1/mappers/product.mapper.ts
export function dtoToDomain(dto: CreateProductsDto): Product {
  return { ...dto };
}

export function domainToResponse(product: Product): ProductResponseDto {
  return { id: product.id, name: product.name, price: product.price, image: product.image };
}
```

In this project, DTOs and domain models are currently aligned, but use mappers when they diverge.

## Param Transformation

Use built-in NestJS pipes for params — never manual parsing:

```typescript
@Get(':id')
getOne(@Param('id', ParseIntPipe) id: number)  // ✅ string → number + validation

@Get(':uuid')
getByUuid(@Param('uuid', ParseUUIDPipe) uuid: string)  // ✅ UUID validation
```

**NEVER** do `Number(id)` or `parseInt(id)` in a controller method body.
