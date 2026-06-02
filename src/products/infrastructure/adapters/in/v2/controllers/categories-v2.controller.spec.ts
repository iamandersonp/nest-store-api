import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { CreateCategoryV2UseCase } from '@products/application/create-category-v2.use-case.service';
import { GetAllCategoriesV2UseCase } from '@products/application/get-all-categories-v2.use-case.service';
import { GetCategoryV2UseCase } from '@products/application/get-category-v2.use-case.service';
import { UpdateCategoryV2UseCase } from '@products/application/update-category-v2.use-case.service';
import { DeleteCategoryV2UseCase } from '@products/application/delete-category-v2.use-case.service';
import { Category } from '@products/domain/models/category.entity';
import { CategoryNotFoundError } from '@products/domain/errors/category-not-found.error';
import {
  CreateCategoryV2Dto,
  UpdateCategoryV2Dto,
} from '@products/infrastructure/adapters/in/v2/dtos/categories-v2.dto';

import { CategoriesV2Controller } from './categories-v2.controller';

describe('CategoriesV2Controller', () => {
  let controller: CategoriesV2Controller;
  let createCategoryV2UseCase: { execute: jest.Mock };
  let getAllCategoriesV2UseCase: { execute: jest.Mock };
  let getCategoryV2UseCase: { execute: jest.Mock };
  let updateCategoryV2UseCase: { execute: jest.Mock };
  let deleteCategoryV2UseCase: { execute: jest.Mock };

  const category: Category = {
    id: 1,
    name: 'C',
  };

  beforeEach(async () => {
    createCategoryV2UseCase = { execute: jest.fn() };
    getAllCategoriesV2UseCase = { execute: jest.fn() };
    getCategoryV2UseCase = { execute: jest.fn() };
    updateCategoryV2UseCase = { execute: jest.fn() };
    deleteCategoryV2UseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesV2Controller],
      providers: [
        { provide: CreateCategoryV2UseCase, useValue: createCategoryV2UseCase },
        { provide: GetAllCategoriesV2UseCase, useValue: getAllCategoriesV2UseCase },
        { provide: GetCategoryV2UseCase, useValue: getCategoryV2UseCase },
        { provide: UpdateCategoryV2UseCase, useValue: updateCategoryV2UseCase },
        { provide: DeleteCategoryV2UseCase, useValue: deleteCategoryV2UseCase },
      ],
    }).compile();

    controller = module.get<CategoriesV2Controller>(CategoriesV2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll delegates to the use-case', async () => {
    getAllCategoriesV2UseCase.execute.mockResolvedValue([category]);
    await expect(controller.getAll()).resolves.toEqual([category]);
    expect(getAllCategoriesV2UseCase.execute).toHaveBeenCalledWith();
  });

  it('getOne delegates to the use-case', async () => {
    getCategoryV2UseCase.execute.mockResolvedValue(category);
    await expect(controller.getOne(1)).resolves.toEqual(category);
    expect(getCategoryV2UseCase.execute).toHaveBeenCalledWith(1);
  });

  it('getOne throws NotFoundException when CategoryNotFoundError', async () => {
    getCategoryV2UseCase.execute.mockRejectedValue(new CategoryNotFoundError(1));
    await expect(controller.getOne(1)).rejects.toThrow(NotFoundException);
  });

  it('create delegates to the use-case', async () => {
    const payload = { name: 'C' } as CreateCategoryV2Dto;
    createCategoryV2UseCase.execute.mockResolvedValue(category);
    await expect(controller.create(payload)).resolves.toEqual(category);
    expect(createCategoryV2UseCase.execute).toHaveBeenCalled();
  });

  it('update delegates to the use-case', async () => {
    const payload = { name: 'New' } as UpdateCategoryV2Dto;
    updateCategoryV2UseCase.execute.mockResolvedValue(category);
    await expect(controller.update(1, payload)).resolves.toEqual(category);
    expect(updateCategoryV2UseCase.execute).toHaveBeenCalledWith(1, payload);
  });

  it('update throws NotFoundException when CategoryNotFoundError', async () => {
    const payload = { name: 'New' } as UpdateCategoryV2Dto;
    updateCategoryV2UseCase.execute.mockRejectedValue(new CategoryNotFoundError(1));
    await expect(controller.update(1, payload)).rejects.toThrow(NotFoundException);
  });

  it('delete delegates to the use-case', async () => {
    deleteCategoryV2UseCase.execute.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(deleteCategoryV2UseCase.execute).toHaveBeenCalledWith(1);
  });

  it('delete throws NotFoundException when CategoryNotFoundError', async () => {
    deleteCategoryV2UseCase.execute.mockRejectedValue(new CategoryNotFoundError(1));
    await expect(controller.delete(1)).rejects.toThrow(NotFoundException);
  });
});
