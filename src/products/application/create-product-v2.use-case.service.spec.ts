import { Test, TestingModule } from '@nestjs/testing';
import { PRODUCTS_PRISMA_PORT } from '@products/domain/ports/products-prisma.port';
import { CreateProductCommand } from '@products/application/commands';
import { CreateProductV2UseCase } from './create-product-v2.use-case.service';

describe('CreateProductV2UseCase', () => {
  let useCase: CreateProductV2UseCase;
  let port: { create: jest.Mock };

  beforeEach(async () => {
    port = { create: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateProductV2UseCase, { provide: PRODUCTS_PRISMA_PORT, useValue: port }],
    }).compile();
    useCase = module.get(CreateProductV2UseCase);
  });

  it('should delegate create to the prisma adapter', async () => {
    const dto = { name: 'Test', description: 'desc', price: 10, stock: 5, image: 'img' };
    const command = new CreateProductCommand({ ...dto, brandId: 1, categoryId: 1 });
    const expected = { id: 1, ...dto, brandId: 1, categoryId: 1 };
    port.create.mockResolvedValue(expected);
    await expect(useCase.execute(command)).resolves.toEqual(expected);
    expect(port.create).toHaveBeenCalledWith(command);
  });
});
