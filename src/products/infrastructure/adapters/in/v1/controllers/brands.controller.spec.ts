import { Test, TestingModule } from '@nestjs/testing';

import { BrandUseCaseService } from '@products/application/brand-use-case.service';
import { Brand } from '@products/domain/models/brand.entity';
import {
  CreateBrandDto,
  UpdateBrandDto,
} from '@products/infrastructure/adapters/in/v1/dtos/brands.dto';

import { BrandsController } from './brands.controller';

describe('BrandsController', () => {
  let controller: BrandsController;
  let useCase: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  const brand: Brand = { id: 1, name: 'B', image: 'img' };

  beforeEach(async () => {
    useCase = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [{ provide: BrandUseCaseService, useValue: useCase }],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll delegates to the use-case', async () => {
    useCase.findAll.mockResolvedValue([brand]);
    await expect(controller.getAll()).resolves.toEqual([brand]);
    expect(useCase.findAll).toHaveBeenCalledWith();
  });

  it('getOne delegates to the use-case', async () => {
    useCase.findOne.mockResolvedValue(brand);
    await expect(controller.getOne(1)).resolves.toEqual(brand);
    expect(useCase.findOne).toHaveBeenCalledWith(1);
  });

  it('create delegates to the use-case', async () => {
    const payload = { name: 'B', image: 'img' } as CreateBrandDto;
    useCase.create.mockResolvedValue(brand);
    await expect(controller.create(payload)).resolves.toEqual(brand);
    expect(useCase.create).toHaveBeenCalledWith(payload);
  });

  it('update delegates to the use-case', async () => {
    const payload = { name: 'New' } as UpdateBrandDto;
    useCase.update.mockResolvedValue(brand);
    await expect(controller.update(1, payload)).resolves.toEqual(brand);
    expect(useCase.update).toHaveBeenCalledWith(1, payload);
  });

  it('delete delegates to the use-case', async () => {
    useCase.delete.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(useCase.delete).toHaveBeenCalledWith(1);
  });
});
