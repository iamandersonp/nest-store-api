/**
 * Error de dominio: Categoría no encontrada.
 */
export class CategoryNotFoundError extends Error {
  readonly name = 'CategoryNotFoundError';
  constructor(categoryId: number) {
    super(`Category with id=${categoryId} not found.`);
  }
}
