---
name: typescript-strict
description: >
  TypeScript strict patterns and best practices.
  Trigger: TypeScript, types, strict mode, any, unknown, typing, interfaces, generics, type guards, hexagonal, NestJS. Strict TypeScript rules including TSConfig, ESLint, hexagonal typing, and NestJS patterns for this project.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: '1.0'
  scope: [root, domain, application, infrastructure]
  auto_invoke: 'Writing TypeScript types/interfaces'
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## TSConfig Strict Mode (REQUIRED)

This project MUST use these compiler flags — enable them in `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "strict": true, // Enables all strict checks below
    "strictNullChecks": true, // ✅ already on
    "noImplicitAny": true, // ❌ currently off — ENABLE
    "strictBindCallApply": true, // ❌ currently off — ENABLE
    "noFallthroughCasesInSwitch": true, // ❌ currently off — ENABLE
    "noUncheckedIndexedAccess": true, // Prevents obj[key] without undefined check
    "exactOptionalPropertyTypes": true, // `prop?: string` → `prop: string | undefined` is error
    "noUnusedLocals": true, // Error on unused locals
    "noUnusedParameters": true, // Error on unused params (prefix with `_` to skip)
  },
}
```

**Why:** Partial strict mode creates a false sense of safety. Every `strict: false` flag is a class of bugs the compiler could catch but won't.

## Never Use `any` (REQUIRED)

```typescript
// ✅ Use unknown + type guard
function parse(input: unknown): User {
  if (isUser(input)) return input;
  throw new Error('Invalid input');
}

// ✅ Use generics
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// ✅ Use `Record<string, ...>` for dynamic keys
type ProductMap = Record<string, Product>;

// ❌ NEVER
function parse(input: any): any {}
const data: any = await db.query(); // NO!
```

**Exception:** Test files (`*.spec.ts`, `*.test.ts`) MAY use `any` for mocks/stubs. This is already configured in ESLint.

## Const Types Pattern (REQUIRED)

```typescript
// ✅ ALWAYS: const object + keyof typeof
const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
} as const;

type ProductStatus = (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];

// ❌ NEVER: raw union
type ProductStatus = 'active' | 'inactive' | 'draft';
```

**Why:** Single source of truth, runtime access, autocomplete, easier refactoring. Applies to enums, status values, config maps.

## Flat Interfaces + Composition (REQUIRED)

```typescript
// ✅ ALWAYS: dedicated interface per nested object
interface ProductPrice {
  amount: number;
  currency: string;
}

interface Product {
  id: string;
  name: string;
  price: ProductPrice; // reference, not inline
}

// ❌ NEVER: inline nested types
interface Product {
  price: { amount: number; currency: string }; // NO!
}
```

**Why:** Reusability, clearer type errors, easier to extend with discriminated unions.

## Discriminated Unions for Coupled Props (REQUIRED)

If two or more props are only meaningful together, they belong to the same discriminated union branch.

```typescript
// ❌ Independent optionals — half-states compile but break at runtime
interface PaginationQuery {
  page?: number;
  pageSize?: number;
  totalPages?: number;
}

// ✅ Discriminated union — invalid states impossible
type PaginationNone = { enabled: false; page?: never; pageSize?: never };
type PaginationActive = { enabled: true; page: number; pageSize: number };
type PaginationQuery = PaginationNone | PaginationActive;
```

## Type Guards (REQUIRED for unknown)

```typescript
function isProduct(value: unknown): value is Product {
  return typeof value === 'object' && value !== null && 'id' in value && 'name' in value;
}
```

Use branded types for domain primitives where IDs could be confused:

```typescript
type ProductId = string & { readonly __brand: 'ProductId' };
type UserId = string & { readonly __brand: 'UserId' };
```

## Import Types

```typescript
import type { Product, ProductId } from './domain/models/product.entity';
import { createProduct, type CreateProductDto } from './dtos/product.dto';
```

**Always** use `import type` for type-only imports — they're erased at runtime and prevent circular dependency issues.

## Hexagonal Typing — Domain (REQUIRED)

```typescript
// ✅ Domain entities are plain objects with readonly props
interface ProductEntity {
  readonly id: ProductId;
  readonly name: string;
  readonly price: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// ✅ Ports define the contract with strict return types
export const PRODUCTS_REPOSITORY_PORT: InjectionToken = Symbol('PRODUCTS_REPOSITORY_PORT');

export interface ProductsRepositoryPort {
  findAll(): Promise<ProductEntity[]>;
  findById(id: ProductId): Promise<ProductEntity | null>;
  create(data: Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductEntity>;
}
```

## Hexagonal Typing — Application (REQUIRED)

```typescript
// ✅ Use-cases return Result-like patterns, never throw raw
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCTS_REPOSITORY_PORT)
    private readonly repository: ProductsRepositoryPort,
  ) {}

  async execute(dto: CreateProductDto): Promise<ProductEntity> {
    const existing = await this.repository.findById(dto.id);
    if (existing) {
      throw new ConflictException(`Product ${dto.id} already exists`);
    }
    return this.repository.create({ ...dto, name: dto.name.trim() });
  }
}
```

**Rule:** `application/` NEVER imports from `infrastructure/`. Input types are DTOs, output types are domain entities.

## DTO Typing (REQUIRED)

```typescript
// ✅ Readonly + definite assignment + validation decorators
export class CreateProductDto {
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

// ✅ PartialType from @nestjs/swagger, NOT @nestjs/mapped-types
export class UpdateProductDto extends PartialType(CreateProductDto) {}
```

## DI Token Typing (REQUIRED)

```typescript
// ✅ Always type the InjectionToken generic
export const PRODUCTS_SERVICE_PORT: InjectionToken = Symbol('PRODUCTS_SERVICE_PORT');
```

**Why:** Without the generic, injected values are `unknown` and need casts. With it, the type flows through the DI chain.

## Utility Types Reference

```typescript
Pick<Product, 'id' | 'name'>; // Select fields
Omit<Product, 'createdAt'>; // Exclude fields
Partial<Product>; // All optional (DTO updates)
Required<Product>; // All required
Readonly<Product>; // All readonly
Record<string, Product>; // Object map
Extract<Union, 'a'>; // Extract from union
Exclude<Union, 'a'>; // Exclude from union
NonNullable<T | null>; // Strip null/undefined
ReturnType<typeof fn>; // Function return type
Awaited<ReturnType<typeof fn>>; // Unwrapped promise return
```

## Test Typing (Strict TDD exceptions)

```typescript
// ✅ Allowed: no-unsafe-* for mocks
const mockRepo = {
  findAll: jest.fn().mockResolvedValue([] as any),
} as any;

// ❌ Still forbidden: no-focused-tests, no-conditional-expect
// it.only(...) → ESLint error
// expect(...) inside if → ESLint error
```

## References

- `tsconfig.json` — strict mode flags to enable
- `eslint.config.mjs` — TypeScript strict rules (tests excluded)
- `docs/agents/CONVENTIONS.md` — naming, DTOs, DI, OpenSpec
- `docs/agents/ARCHITECTURE.md` — hexagonal layer boundaries
- `docs/agents/TESTING.md` — test patterns and expectations
