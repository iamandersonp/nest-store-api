import { Test, TestingModule } from '@nestjs/testing';
import { PRODUCTS_PRISMA_PORT } from '@products/domain/ports/products-prisma.port';
import { DeleteProductV2UseCase } from './delete-product-v2.use-case.service';

describe('DeleteProductV2UseCase', () => {
  let useCase: DeleteProductV2UseCase;
  let port: { delete: jest.Mock };

  beforeEach(async () => {
    port = { delete: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteProductV2UseCase, { provide: PRODUCTS_PRISMA_PORT, useValue: port }],
    }).compile();
    useCase = module.get(DeleteProductV2UseCase);
  });

  it('should delegate delete to the prisma adapter', async () => {
    port.delete.mockResolvedValue(undefined);
    await expect(useCase.execute(1)).resolves.toBeUndefined();
    expect(port.delete).toHaveBeenCalledWith(1);
  });
});
