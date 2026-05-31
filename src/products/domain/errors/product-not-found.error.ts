/**
 * Error de dominio: Producto no encontrado.
 * @memberof products/domain/errors
 */
export class ProductNotFoundError extends Error {
  readonly name = 'ProductNotFoundError';
  constructor(productId: number) {
    super(`Product with id=${productId} not found.`);
  }
}
