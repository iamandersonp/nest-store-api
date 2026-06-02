import { Test, TestingModule } from '@nestjs/testing';
import { PRODUCTS_SERVICE_PORT } from '@products/domain/ports/product.port';
import { UpdateProductCommand } from '@products/application/commands';
import { UpdateProductUseCase } from './update-product.use-case.service';

describe('UpdateProductUseCase', () => {
  let useCase: UpdateProductUseCase;
  let port: { update: jest.Mock };

  beforeEach(async () => {
    port = { update: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateProductUseCase, { provide: PRODUCTS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(UpdateProductUseCase);
  });

  it('should delegate update to the port', async () => {
    const command = new UpdateProductCommand({ name: 'Updated' });
    const expected = {
      id: 1,
      name: 'Updated',
      description: 'desc',
      price: 10,
      stock: 5,
      image: 'img',
    };
    port.update.mockResolvedValue(expected);
    await expect(useCase.execute(1, command)).resolves.toEqual(expected);
    expect(port.update).toHaveBeenCalledWith(1, command);
  });
});
