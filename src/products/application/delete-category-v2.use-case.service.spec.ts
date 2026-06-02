import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORIES_PRISMA_PORT } from '@products/domain/ports/categories-prisma.port';
import { DeleteCategoryV2UseCase } from './delete-category-v2.use-case.service';

describe('DeleteCategoryV2UseCase', () => {
  let useCase: DeleteCategoryV2UseCase;
  let port: { delete: jest.Mock };

  beforeEach(async () => {
    port = { delete: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteCategoryV2UseCase, { provide: CATEGORIES_PRISMA_PORT, useValue: port }],
    }).compile();
    useCase = module.get(DeleteCategoryV2UseCase);
  });

  it('should delegate delete to the prisma adapter', async () => {
    port.delete.mockResolvedValue(undefined);
    await expect(useCase.execute(1)).resolves.toBeUndefined();
    expect(port.delete).toHaveBeenCalledWith(1);
  });
});
