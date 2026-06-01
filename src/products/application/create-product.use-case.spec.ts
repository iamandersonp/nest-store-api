import { Test, TestingModule } from '@nestjs/testing';
import { PRODUCTS_SERVICE_PORT } from '@products/domain/ports/product.port';
import { CreateProductUseCase } from './create-product.use-case';

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
    const payload = { name: 'Test', description: 'desc', price: 10, stock: 5, image: 'img' };
    const expected = { id: 1, ...payload };
    port.create.mockResolvedValue(expected);
    await expect(useCase.execute(payload)).resolves.toEqual(expected);
    expect(port.create).toHaveBeenCalledWith(payload);
  });
});
