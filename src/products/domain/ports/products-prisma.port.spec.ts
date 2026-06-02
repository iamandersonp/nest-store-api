import { PRODUCTS_PRISMA_PORT } from './products-prisma.port';
import { BRANDS_PRISMA_PORT } from './brands-prisma.port';
import { CATEGORIES_PRISMA_PORT } from './categories-prisma.port';

describe('PrismaPorts', () => {
  it('should define PRODUCTS_PRISMA_PORT as a symbol', () => {
    expect(typeof PRODUCTS_PRISMA_PORT).toBe('symbol');
    expect(PRODUCTS_PRISMA_PORT.description).toBe('PRODUCTS_PRISMA_PORT');
  });

  it('should define BRANDS_PRISMA_PORT as a symbol', () => {
    expect(typeof BRANDS_PRISMA_PORT).toBe('symbol');
    expect(BRANDS_PRISMA_PORT.description).toBe('BRANDS_PRISMA_PORT');
  });

  it('should define CATEGORIES_PRISMA_PORT as a symbol', () => {
    expect(typeof CATEGORIES_PRISMA_PORT).toBe('symbol');
    expect(CATEGORIES_PRISMA_PORT.description).toBe('CATEGORIES_PRISMA_PORT');
  });

  it('should have unique symbols', () => {
    expect(PRODUCTS_PRISMA_PORT).not.toBe(BRANDS_PRISMA_PORT);
    expect(BRANDS_PRISMA_PORT).not.toBe(CATEGORIES_PRISMA_PORT);
    expect(CATEGORIES_PRISMA_PORT).not.toBe(PRODUCTS_PRISMA_PORT);
  });
});
