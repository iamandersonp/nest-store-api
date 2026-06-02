import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORIES_PRISMA_PORT } from '@products/domain/ports/categories-prisma.port';
import { GetAllCategoriesV2UseCase } from './get-all-categories-v2.use-case.service';

describe('GetAllCategoriesV2UseCase', () => {
  let useCase: GetAllCategoriesV2UseCase;
  let port: { findAll: jest.Mock };

  beforeEach(async () => {
    port = { findAll: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllCategoriesV2UseCase, { provide: CATEGORIES_PRISMA_PORT, useValue: port }],
    }).compile();
    useCase = module.get(GetAllCategoriesV2UseCase);
  });

  it('should delegate findAll to the prisma adapter', async () => {
    const expected = [{ id: 1, name: 'Category' }];
    port.findAll.mockResolvedValue(expected);
    await expect(useCase.execute()).resolves.toEqual(expected);
    expect(port.findAll).toHaveBeenCalledWith();
  });
});
