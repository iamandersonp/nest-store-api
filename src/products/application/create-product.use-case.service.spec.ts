import { Test, TestingModule } from '@nestjs/testing';
import { PRODUCTS_SERVICE_PORT } from '@products/domain/ports/product.port';
import { CreateProductCommand } from '@products/application/commands';
import { CreateProductUseCase } from './create-product.use-case.service';

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let port: { create: jest.Mock };

  beforeEach(async () => {
    port = { create: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateProductUseCase, { provide: PRODUCTS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(CreateProductUseCase);
  });

  it('should delegate create to the port', async () => {
    const dto = { name: 'Test', description: 'desc', price: 10, stock: 5, image: 'img' };
    const command = new CreateProductCommand({ ...dto, brandId: 1, categoryId: 1 });
    const expected = { id: 1, ...dto, brandId: 1, categoryId: 1 };
    port.create.mockResolvedValue(expected);
    await expect(useCase.execute(command)).resolves.toEqual(expected);
    expect(port.create).toHaveBeenCalledWith(command);
  });
});
