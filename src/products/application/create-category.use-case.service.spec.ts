import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORIES_SERVICE_PORT } from '@products/domain/ports/category.port';
import { CreateCategoryCommand } from '@products/application/commands';
import { CreateCategoryUseCase } from './create-category.use-case.service';

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
    const dto = { name: 'Category' };
    const command = new CreateCategoryCommand(dto);
    const expected = { id: 1, ...dto };
    port.create.mockResolvedValue(expected);
    await expect(useCase.execute(command)).resolves.toEqual(expected);
    expect(port.create).toHaveBeenCalledWith(command);
  });
});
