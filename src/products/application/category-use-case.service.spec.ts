import { Test, TestingModule } from '@nestjs/testing';

import { Category } from '@products/domain/models/category.entity';
import { CATEGORIES_SERVICE_PORT } from '@products/domain/ports/category.port';
import {
  CreateCategoryDto,
  UpdateCategoryDtoDto,
} from '@products/infrastructure/adapters/in/v1/dtos/categories.dto';

import { CategoryUseCaseService } from './category-use-case.service';

describe('CategoryUseCaseService', () => {
  let useCase: CategoryUseCaseService;
  let port: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  const category: Category = { id: 1, name: 'C' };

  beforeEach(async () => {
    port = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryUseCaseService, { provide: CATEGORIES_SERVICE_PORT, useValue: port }],
    }).compile();

    useCase = module.get<CategoryUseCaseService>(CategoryUseCaseService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('findAll delegates to the port', async () => {
    port.findAll.mockResolvedValue([category]);
    await expect(useCase.findAll()).resolves.toEqual([category]);
    expect(port.findAll).toHaveBeenCalledWith();
  });

  it('findOne delegates to the port', async () => {
    port.findOne.mockResolvedValue(category);
    await expect(useCase.findOne(1)).resolves.toEqual(category);
    expect(port.findOne).toHaveBeenCalledWith(1);
  });

  it('create delegates to the port', async () => {
    const payload = { name: 'C' } as CreateCategoryDto;
    port.create.mockResolvedValue(category);
    await expect(useCase.create(payload)).resolves.toEqual(category);
    expect(port.create).toHaveBeenCalledWith(payload);
  });

  it('update delegates to the port', async () => {
    const payload = { name: 'New' } as UpdateCategoryDtoDto;
    port.update.mockResolvedValue(category);
    await expect(useCase.update(1, payload)).resolves.toEqual(category);
    expect(port.update).toHaveBeenCalledWith(1, payload);
  });

  it('delete delegates to the port', async () => {
    port.delete.mockResolvedValue(undefined);
    await expect(useCase.delete(1)).resolves.toBeUndefined();
    expect(port.delete).toHaveBeenCalledWith(1);
  });
});
