import { Test, TestingModule } from '@nestjs/testing';
import { PRODUCTS_PRISMA_PORT } from '@products/domain/ports/products-prisma.port';
import { UpdateProductCommand } from '@products/application/commands';
import { UpdateProductV2UseCase } from './update-product-v2.use-case.service';

describe('UpdateProductV2UseCase', () => {
  let useCase: UpdateProductV2UseCase;
  let port: { update: jest.Mock };

  beforeEach(async () => {
    port = { update: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateProductV2UseCase, { provide: PRODUCTS_PRISMA_PORT, useValue: port }],
    }).compile();
    useCase = module.get(UpdateProductV2UseCase);
  });

  it('should delegate update to the prisma adapter', async () => {
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
