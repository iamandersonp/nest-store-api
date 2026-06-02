import { Test, TestingModule } from '@nestjs/testing';
import { PRODUCTS_PRISMA_PORT } from '@products/domain/ports/products-prisma.port';
import { GetProductV2UseCase } from './get-product-v2.use-case.service';

describe('GetProductV2UseCase', () => {
  let useCase: GetProductV2UseCase;
  let port: { findOne: jest.Mock };

  beforeEach(async () => {
    port = { findOne: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetProductV2UseCase, { provide: PRODUCTS_PRISMA_PORT, useValue: port }],
    }).compile();
    useCase = module.get(GetProductV2UseCase);
  });

  it('should delegate findOne to the prisma adapter', async () => {
    const expected = {
      id: 1,
      name: 'Test',
      description: 'desc',
      price: 10,
      stock: 5,
      image: 'img',
    };
    port.findOne.mockResolvedValue(expected);
    await expect(useCase.execute(1)).resolves.toEqual(expected);
    expect(port.findOne).toHaveBeenCalledWith(1);
  });
});
