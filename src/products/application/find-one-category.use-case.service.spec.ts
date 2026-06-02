import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORIES_SERVICE_PORT } from '@products/domain/ports/category.port';
import { FindOneCategoryUseCase } from './find-one-category.use-case.service';

describe('FindOneCategoryUseCase', () => {
  let useCase: FindOneCategoryUseCase;
  let port: { findOne: jest.Mock };

  beforeEach(async () => {
    port = { findOne: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindOneCategoryUseCase, { provide: CATEGORIES_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(FindOneCategoryUseCase);
  });

  it('should delegate findOne to the port', async () => {
    const expected = { id: 1, name: 'Category' };
    port.findOne.mockResolvedValue(expected);
    await expect(useCase.execute(1)).resolves.toEqual(expected);
    expect(port.findOne).toHaveBeenCalledWith(1);
  });
});
