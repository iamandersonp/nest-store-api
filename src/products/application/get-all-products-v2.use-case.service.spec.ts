import { Test, TestingModule } from '@nestjs/testing';
import { PRODUCTS_PRISMA_PORT } from '@products/domain/ports/products-prisma.port';
import { GetAllProductsV2UseCase } from './get-all-products-v2.use-case.service';

describe('GetAllProductsV2UseCase', () => {
  let useCase: GetAllProductsV2UseCase;
  let port: { findAll: jest.Mock };

  beforeEach(async () => {
    port = { findAll: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllProductsV2UseCase, { provide: PRODUCTS_PRISMA_PORT, useValue: port }],
    }).compile();
    useCase = module.get(GetAllProductsV2UseCase);
  });

  it('should delegate findAll to the prisma adapter', async () => {
    const expected = [
      { id: 1, name: 'Test', description: 'desc', price: 10, stock: 5, image: 'img' },
    ];
    port.findAll.mockResolvedValue(expected);
    await expect(useCase.execute()).resolves.toEqual(expected);
    expect(port.findAll).toHaveBeenCalledWith();
  });
});
