import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORIES_PRISMA_PORT } from '@products/domain/ports/categories-prisma.port';
import { UpdateCategoryCommand } from '@products/application/commands';
import { UpdateCategoryV2UseCase } from './update-category-v2.use-case.service';

describe('UpdateCategoryV2UseCase', () => {
  let useCase: UpdateCategoryV2UseCase;
  let port: { update: jest.Mock };

  beforeEach(async () => {
    port = { update: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCategoryV2UseCase, { provide: CATEGORIES_PRISMA_PORT, useValue: port }],
    }).compile();
    useCase = module.get(UpdateCategoryV2UseCase);
  });

  it('should delegate update to the prisma adapter', async () => {
    const command = new UpdateCategoryCommand({ name: 'Updated' });
    const expected = { id: 1, name: 'Updated' };
    port.update.mockResolvedValue(expected);
    await expect(useCase.execute(1, command)).resolves.toEqual(expected);
    expect(port.update).toHaveBeenCalledWith(1, command);
  });
});
