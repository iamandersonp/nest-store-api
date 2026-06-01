import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORIES_SERVICE_PORT } from '@products/domain/ports/category.port';
import { UpdateCategoryUseCase } from './update-category.use-case';

describe('UpdateCategoryUseCase', () => {
  let useCase: UpdateCategoryUseCase;
  let port: { update: jest.Mock };

  beforeEach(async () => {
    port = { update: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCategoryUseCase, { provide: CATEGORIES_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(UpdateCategoryUseCase);
  });

  it('should delegate update to the port', async () => {
    const payload = { name: 'Updated' };
    const expected = { id: 1, name: 'Updated' };
    port.update.mockResolvedValue(expected);
    await expect(useCase.execute(1, payload)).resolves.toEqual(expected);
    expect(port.update).toHaveBeenCalledWith(1, payload);
  });
});
