import { Test, TestingModule } from '@nestjs/testing';

import { CreateCategoryUseCase } from '@products/application/create-category.use-case';
import { FindAllCategoriesUseCase } from '@products/application/find-all-categories.use-case';
import { FindOneCategoryUseCase } from '@products/application/find-one-category.use-case';
import { UpdateCategoryUseCase } from '@products/application/update-category.use-case';
import { DeleteCategoryUseCase } from '@products/application/delete-category.use-case';
import { Category } from '@products/domain/models/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDtoDto,
} from '@products/infrastructure/adapters/in/v1/dtos/categories.dto';

import { CategoriesController } from './categories.controller';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let createCategoryUseCase: { execute: jest.Mock };
  let findAllCategoriesUseCase: { execute: jest.Mock };
  let findOneCategoryUseCase: { execute: jest.Mock };
  let updateCategoryUseCase: { execute: jest.Mock };
  let deleteCategoryUseCase: { execute: jest.Mock };

  const category: Category = { id: 1, name: 'C' };

  beforeEach(async () => {
    createCategoryUseCase = { execute: jest.fn() };
    findAllCategoriesUseCase = { execute: jest.fn() };
    findOneCategoryUseCase = { execute: jest.fn() };
    updateCategoryUseCase = { execute: jest.fn() };
    deleteCategoryUseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: CreateCategoryUseCase, useValue: createCategoryUseCase },
        { provide: FindAllCategoriesUseCase, useValue: findAllCategoriesUseCase },
        { provide: FindOneCategoryUseCase, useValue: findOneCategoryUseCase },
        { provide: UpdateCategoryUseCase, useValue: updateCategoryUseCase },
        { provide: DeleteCategoryUseCase, useValue: deleteCategoryUseCase },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll delegates to the use-case', async () => {
    findAllCategoriesUseCase.execute.mockResolvedValue([category]);
    await expect(controller.getAll()).resolves.toEqual([category]);
    expect(findAllCategoriesUseCase.execute).toHaveBeenCalledWith();
  });

  it('getOne delegates to the use-case', async () => {
    findOneCategoryUseCase.execute.mockResolvedValue(category);
    await expect(controller.getOne(1)).resolves.toEqual(category);
    expect(findOneCategoryUseCase.execute).toHaveBeenCalledWith(1);
  });

  it('create delegates to the use-case', async () => {
    const payload = { name: 'C' } as CreateCategoryDto;
    createCategoryUseCase.execute.mockResolvedValue(category);
    await expect(controller.create(payload)).resolves.toEqual(category);
    expect(createCategoryUseCase.execute).toHaveBeenCalledWith(payload);
  });

  it('update delegates to the use-case', async () => {
    const payload = { name: 'New' } as UpdateCategoryDtoDto;
    updateCategoryUseCase.execute.mockResolvedValue(category);
    await expect(controller.update(1, payload)).resolves.toEqual(category);
    expect(updateCategoryUseCase.execute).toHaveBeenCalledWith(1, payload);
  });

  it('delete delegates to the use-case', async () => {
    deleteCategoryUseCase.execute.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(deleteCategoryUseCase.execute).toHaveBeenCalledWith(1);
  });
});
