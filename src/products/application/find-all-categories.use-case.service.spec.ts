import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORIES_SERVICE_PORT } from '@products/domain/ports/category.port';
import { FindAllCategoriesUseCase } from './find-all-categories.use-case.service';

describe('FindAllCategoriesUseCase', () => {
  let useCase: FindAllCategoriesUseCase;
  let port: { findAll: jest.Mock };

  beforeEach(async () => {
    port = { findAll: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllCategoriesUseCase, { provide: CATEGORIES_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(FindAllCategoriesUseCase);
  });

  it('should delegate findAll to the port', async () => {
    const expected = [{ id: 1, name: 'Category' }];
    port.findAll.mockResolvedValue(expected);
    await expect(useCase.execute()).resolves.toEqual(expected);
    expect(port.findAll).toHaveBeenCalledWith();
  });
});
