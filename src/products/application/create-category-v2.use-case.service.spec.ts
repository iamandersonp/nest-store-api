import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORIES_PRISMA_PORT } from '@products/domain/ports/categories-prisma.port';
import { CreateCategoryCommand } from '@products/application/commands';
import { CreateCategoryV2UseCase } from './create-category-v2.use-case.service';

describe('CreateCategoryV2UseCase', () => {
  let useCase: CreateCategoryV2UseCase;
  let port: { create: jest.Mock };

  beforeEach(async () => {
    port = { create: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCategoryV2UseCase, { provide: CATEGORIES_PRISMA_PORT, useValue: port }],
    }).compile();
    useCase = module.get(CreateCategoryV2UseCase);
  });

  it('should delegate create to the prisma adapter', async () => {
    const command = new CreateCategoryCommand({ name: 'Category' });
    const expected = { id: 1, name: 'Category' };
    port.create.mockResolvedValue(expected);
    await expect(useCase.execute(command)).resolves.toEqual(expected);
    expect(port.create).toHaveBeenCalledWith(command);
  });
});
