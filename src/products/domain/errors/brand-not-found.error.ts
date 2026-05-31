/**
 * Error de dominio: Marca no encontrada.
 */
export class BrandNotFoundError extends Error {
  readonly name = 'BrandNotFoundError';
  constructor(brandId: number) {
    super(`Brand with id=${brandId} not found.`);
  }
}
