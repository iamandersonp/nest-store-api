import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORIES_SERVICE_PORT } from '@products/domain/ports/category.port';
import { CreateCategoryUseCase } from './create-category.use-case';

describe('CreateCategoryUseCase', () => {
  let useCase: CreateCategoryUseCase;
  let port: { create: jest.Mock };

  beforeEach(async () => {
    port = { create: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCategoryUseCase, { provide: CATEGORIES_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(CreateCategoryUseCase);
  });

  it('should delegate create to the port', async () => {
    const payload = { name: 'Category' };
    const expected = { id: 1, ...payload };
    port.create.mockResolvedValue(expected);
    await expect(useCase.execute(payload)).resolves.toEqual(expected);
    expect(port.create).toHaveBeenCalledWith(payload);
  });
});
