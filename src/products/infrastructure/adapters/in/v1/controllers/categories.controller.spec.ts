import { Test, TestingModule } from '@nestjs/testing';

import { CategoryUseCaseService } from '@products/application/category-use-case.service';
import { Category } from '@products/domain/models/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDtoDto,
} from '@products/infrastructure/adapters/in/v1/dtos/categories.dto';

import { CategoriesController } from './categories.controller';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let useCase: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  const category: Category = { id: 1, name: 'C' };

  beforeEach(async () => {
    useCase = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [{ provide: CategoryUseCaseService, useValue: useCase }],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll delegates to the use-case', async () => {
    useCase.findAll.mockResolvedValue([category]);
    await expect(controller.getAll()).resolves.toEqual([category]);
    expect(useCase.findAll).toHaveBeenCalledWith();
  });

  it('getOne delegates to the use-case', async () => {
    useCase.findOne.mockResolvedValue(category);
    await expect(controller.getOne(1)).resolves.toEqual(category);
    expect(useCase.findOne).toHaveBeenCalledWith(1);
  });

  it('create delegates to the use-case', async () => {
    const payload = { name: 'C' } as CreateCategoryDto;
    useCase.create.mockResolvedValue(category);
    await expect(controller.create(payload)).resolves.toEqual(category);
    expect(useCase.create).toHaveBeenCalledWith(payload);
  });

  it('update delegates to the use-case', async () => {
    const payload = { name: 'New' } as UpdateCategoryDtoDto;
    useCase.update.mockResolvedValue(category);
    await expect(controller.update(1, payload)).resolves.toEqual(category);
    expect(useCase.update).toHaveBeenCalledWith(1, payload);
  });

  it('delete delegates to the use-case', async () => {
    useCase.delete.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(useCase.delete).toHaveBeenCalledWith(1);
  });
});
