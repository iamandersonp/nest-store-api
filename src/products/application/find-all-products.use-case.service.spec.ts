import { Test, TestingModule } from '@nestjs/testing';
import { PRODUCTS_SERVICE_PORT } from '@products/domain/ports/product.port';
import { FindAllProductsUseCase } from './find-all-products.use-case.service';

describe('FindAllProductsUseCase', () => {
  let useCase: FindAllProductsUseCase;
  let port: { findAll: jest.Mock };

  beforeEach(async () => {
    port = { findAll: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllProductsUseCase, { provide: PRODUCTS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(FindAllProductsUseCase);
  });

  it('should delegate findAll to the port', async () => {
    const expected = [
      { id: 1, name: 'Test', description: 'desc', price: 10, stock: 5, image: 'img' },
    ];
    port.findAll.mockResolvedValue(expected);
    await expect(useCase.execute()).resolves.toEqual(expected);
    expect(port.findAll).toHaveBeenCalledWith();
  });
});
