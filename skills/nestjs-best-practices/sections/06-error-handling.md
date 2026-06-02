# Error Handling

## Domain Errors (REQUIRED)

```typescript
// domain/errors/product-not-found.error.ts
export class ProductNotFoundError extends Error {
  readonly name = 'ProductNotFoundError';
  constructor(productId: number) {
    super(`Product with id=${productId} not found.`);
  }
}
```

**Rules:**

- Domain errors extend `Error`
- Set `name` property to the class name (survives minification)
- Descriptive message in `super()`
- Live in `domain/errors/` — pure TS, zero NestJS imports

## Controller Error Mapping (REQUIRED)

Application layer throws domain errors → Controller maps to HTTP exceptions:

```typescript
@Get(':id')
getOne(@Param('id', ParseIntPipe) id: number) {
  try {
    return this.findOneProductUseCase.execute(id);
  } catch (error) {
    if (error instanceof ProductNotFoundError) {
      throw new NotFoundException(error.message);
    }
    throw error;
  }
}
```

**Why:** Keeps `application/` free of NestJS imports. The use-case doesn't know about HTTP status codes.

## Exception Filters (for cross-cutting errors)

For repeated error-mapping logic across controllers, use an **ExceptionFilter**:

```typescript
@Catch(ProductNotFoundError)
export class ProductNotFoundFilter implements ExceptionFilter {
  catch(exception: ProductNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
      error: 'Not Found',
    });
  }
}
```

**When to use:**

- Filter → Same domain error thrown from multiple controllers
- Try/catch in controller → One-off mapping, or when response shape varies per endpoint

## Error Hierarchy Pattern

```typescript
// Base domain error
export abstract class DomainError extends Error {
  abstract readonly name: string;
}

// Specific errors
export class ProductNotFoundError extends DomainError {
  readonly name = 'ProductNotFoundError';
  constructor(productId: number) {
    super(`Product with id=${productId} not found.`);
  }
}

export class DuplicateProductError extends DomainError {
  readonly name = 'DuplicateProductError';
  constructor(name: string) {
    super(`Product with name="${name}" already exists.`);
  }
}
```

## What NOT to Do

❌ **Throw NestJS exceptions from application layer:**

```typescript
// In use-case — ❌ application should not import NestJS
throw new NotFoundException('Product not found');
```

❌ **Swallow errors with empty catch:**

```typescript
try {
  this.service.execute();
} catch {} // ❌ silent failure
```

❌ **Return null/undefined to signal errors:**

```typescript
execute(id: number): Product | null {   // ❌ ambiguous — null means "not found" or "error"?
```
