import { Test, TestingModule } from '@nestjs/testing';
import { PRODUCTS_SERVICE_PORT } from '@products/domain/ports/product.port';
import { DeleteProductUseCase } from './delete-product.use-case.service';

describe('DeleteProductUseCase', () => {
  let useCase: DeleteProductUseCase;
  let port: { delete: jest.Mock };

  beforeEach(async () => {
    port = { delete: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteProductUseCase, { provide: PRODUCTS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(DeleteProductUseCase);
  });

  it('should delegate delete to the port', async () => {
    port.delete.mockResolvedValue(undefined);
    await expect(useCase.execute(1)).resolves.toBeUndefined();
    expect(port.delete).toHaveBeenCalledWith(1);
  });
});
