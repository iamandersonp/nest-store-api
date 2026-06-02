import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORIES_PRISMA_PORT } from '@products/domain/ports/categories-prisma.port';
import { GetCategoryV2UseCase } from './get-category-v2.use-case.service';

describe('GetCategoryV2UseCase', () => {
  let useCase: GetCategoryV2UseCase;
  let port: { findOne: jest.Mock };

  beforeEach(async () => {
    port = { findOne: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCategoryV2UseCase, { provide: CATEGORIES_PRISMA_PORT, useValue: port }],
    }).compile();
    useCase = module.get(GetCategoryV2UseCase);
  });

  it('should delegate findOne to the prisma adapter', async () => {
    const expected = { id: 1, name: 'Category' };
    port.findOne.mockResolvedValue(expected);
    await expect(useCase.execute(1)).resolves.toEqual(expected);
    expect(port.findOne).toHaveBeenCalledWith(1);
  });
});
