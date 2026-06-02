import { Test, TestingModule } from '@nestjs/testing';
import { PRODUCTS_SERVICE_PORT } from '@products/domain/ports/product.port';
import { FindOneProductUseCase } from './find-one-product.use-case.service';

describe('FindOneProductUseCase', () => {
  let useCase: FindOneProductUseCase;
  let port: { findOne: jest.Mock };

  beforeEach(async () => {
    port = { findOne: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindOneProductUseCase, { provide: PRODUCTS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(FindOneProductUseCase);
  });

  it('should delegate findOne to the port', async () => {
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
