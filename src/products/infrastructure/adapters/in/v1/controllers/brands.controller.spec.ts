import { Test, TestingModule } from '@nestjs/testing';

import { CreateBrandUseCase } from '@products/application/create-brand.use-case';
import { FindAllBrandsUseCase } from '@products/application/find-all-brands.use-case';
import { FindOneBrandUseCase } from '@products/application/find-one-brand.use-case';
import { UpdateBrandUseCase } from '@products/application/update-brand.use-case';
import { DeleteBrandUseCase } from '@products/application/delete-brand.use-case';
import { Brand } from '@products/domain/models/brand.entity';
import { UpdateBrandDto } from '@products/infrastructure/adapters/in/v1/dtos/brands.dto';

import { BrandsController } from './brands.controller';

describe('BrandsController', () => {
  let controller: BrandsController;
  let createBrandUseCase: { execute: jest.Mock };
  let findAllBrandsUseCase: { execute: jest.Mock };
  let findOneBrandUseCase: { execute: jest.Mock };
  let updateBrandUseCase: { execute: jest.Mock };
  let deleteBrandUseCase: { execute: jest.Mock };

  const brand: Brand = { id: 1, name: 'B', image: 'img' };

  beforeEach(async () => {
    createBrandUseCase = { execute: jest.fn() };
    findAllBrandsUseCase = { execute: jest.fn() };
    findOneBrandUseCase = { execute: jest.fn() };
    updateBrandUseCase = { execute: jest.fn() };
    deleteBrandUseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [
        { provide: CreateBrandUseCase, useValue: createBrandUseCase },
        { provide: FindAllBrandsUseCase, useValue: findAllBrandsUseCase },
        { provide: FindOneBrandUseCase, useValue: findOneBrandUseCase },
        { provide: UpdateBrandUseCase, useValue: updateBrandUseCase },
        { provide: DeleteBrandUseCase, useValue: deleteBrandUseCase },
      ],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll delegates to the use-case', async () => {
    findAllBrandsUseCase.execute.mockResolvedValue([brand]);
    await expect(controller.getAll()).resolves.toEqual([brand]);
    expect(findAllBrandsUseCase.execute).toHaveBeenCalledWith();
  });

  it('getOne delegates to the use-case', async () => {
    findOneBrandUseCase.execute.mockResolvedValue(brand);
    await expect(controller.getOne(1)).resolves.toEqual(brand);
    expect(findOneBrandUseCase.execute).toHaveBeenCalledWith(1);
  });

  it('create delegates to the use-case', async () => {
    const payload = { name: 'B', image: 'img' };
    createBrandUseCase.execute.mockResolvedValue(brand);
    await expect(controller.create(payload)).resolves.toEqual(brand);
    expect(createBrandUseCase.execute).toHaveBeenCalledWith(payload);
  });

  it('update delegates to the use-case', async () => {
    const payload = { name: 'New' } as UpdateBrandDto;
    updateBrandUseCase.execute.mockResolvedValue(brand);
    await expect(controller.update(1, payload)).resolves.toEqual(brand);
    expect(updateBrandUseCase.execute).toHaveBeenCalledWith(1, payload);
  });

  it('delete delegates to the use-case', async () => {
    deleteBrandUseCase.execute.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(deleteBrandUseCase.execute).toHaveBeenCalledWith(1);
  });
});
