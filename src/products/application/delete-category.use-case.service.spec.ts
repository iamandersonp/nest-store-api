import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORIES_SERVICE_PORT } from '@products/domain/ports/category.port';
import { DeleteCategoryUseCase } from './delete-category.use-case.service';

describe('DeleteCategoryUseCase', () => {
  let useCase: DeleteCategoryUseCase;
  let port: { delete: jest.Mock };

  beforeEach(async () => {
    port = { delete: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteCategoryUseCase, { provide: CATEGORIES_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(DeleteCategoryUseCase);
  });

  it('should delegate delete to the port', async () => {
    port.delete.mockResolvedValue(undefined);
    await expect(useCase.execute(1)).resolves.toBeUndefined();
    expect(port.delete).toHaveBeenCalledWith(1);
  });
});
