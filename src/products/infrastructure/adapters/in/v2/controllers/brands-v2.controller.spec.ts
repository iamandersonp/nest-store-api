import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { CreateBrandV2UseCase } from '@products/application/create-brand-v2.use-case.service';
import { GetAllBrandsV2UseCase } from '@products/application/get-all-brands-v2.use-case.service';
import { GetBrandV2UseCase } from '@products/application/get-brand-v2.use-case.service';
import { UpdateBrandV2UseCase } from '@products/application/update-brand-v2.use-case.service';
import { DeleteBrandV2UseCase } from '@products/application/delete-brand-v2.use-case.service';
import { Brand } from '@products/domain/models/brand.entity';
import { BrandNotFoundError } from '@products/domain/errors/brand-not-found.error';
import {
  CreateBrandV2Dto,
  UpdateBrandV2Dto,
} from '@products/infrastructure/adapters/in/v2/dtos/brands-v2.dto';

import { BrandsV2Controller } from './brands-v2.controller';

describe('BrandsV2Controller', () => {
  let controller: BrandsV2Controller;
  let createBrandV2UseCase: { execute: jest.Mock };
  let getAllBrandsV2UseCase: { execute: jest.Mock };
  let getBrandV2UseCase: { execute: jest.Mock };
  let updateBrandV2UseCase: { execute: jest.Mock };
  let deleteBrandV2UseCase: { execute: jest.Mock };

  const brand: Brand = {
    id: 1,
    name: 'B',
    image: 'img',
  };

  beforeEach(async () => {
    createBrandV2UseCase = { execute: jest.fn() };
    getAllBrandsV2UseCase = { execute: jest.fn() };
    getBrandV2UseCase = { execute: jest.fn() };
    updateBrandV2UseCase = { execute: jest.fn() };
    deleteBrandV2UseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsV2Controller],
      providers: [
        { provide: CreateBrandV2UseCase, useValue: createBrandV2UseCase },
        { provide: GetAllBrandsV2UseCase, useValue: getAllBrandsV2UseCase },
        { provide: GetBrandV2UseCase, useValue: getBrandV2UseCase },
        { provide: UpdateBrandV2UseCase, useValue: updateBrandV2UseCase },
        { provide: DeleteBrandV2UseCase, useValue: deleteBrandV2UseCase },
      ],
    }).compile();

    controller = module.get<BrandsV2Controller>(BrandsV2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll delegates to the use-case', async () => {
    getAllBrandsV2UseCase.execute.mockResolvedValue([brand]);
    await expect(controller.getAll()).resolves.toEqual([brand]);
    expect(getAllBrandsV2UseCase.execute).toHaveBeenCalledWith();
  });

  it('getOne delegates to the use-case', async () => {
    getBrandV2UseCase.execute.mockResolvedValue(brand);
    await expect(controller.getOne(1)).resolves.toEqual(brand);
    expect(getBrandV2UseCase.execute).toHaveBeenCalledWith(1);
  });

  it('getOne throws NotFoundException when BrandNotFoundError', async () => {
    getBrandV2UseCase.execute.mockRejectedValue(new BrandNotFoundError(1));
    await expect(controller.getOne(1)).rejects.toThrow(NotFoundException);
  });

  it('create delegates to the use-case', async () => {
    const payload = { name: 'B', image: 'img' } as CreateBrandV2Dto;
    createBrandV2UseCase.execute.mockResolvedValue(brand);
    await expect(controller.create(payload)).resolves.toEqual(brand);
    expect(createBrandV2UseCase.execute).toHaveBeenCalled();
  });

  it('update delegates to the use-case', async () => {
    const payload = { name: 'New' } as UpdateBrandV2Dto;
    updateBrandV2UseCase.execute.mockResolvedValue(brand);
    await expect(controller.update(1, payload)).resolves.toEqual(brand);
    expect(updateBrandV2UseCase.execute).toHaveBeenCalledWith(1, payload);
  });

  it('update throws NotFoundException when BrandNotFoundError', async () => {
    const payload = { name: 'New' } as UpdateBrandV2Dto;
    updateBrandV2UseCase.execute.mockRejectedValue(new BrandNotFoundError(1));
    await expect(controller.update(1, payload)).rejects.toThrow(NotFoundException);
  });

  it('delete delegates to the use-case', async () => {
    deleteBrandV2UseCase.execute.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(deleteBrandV2UseCase.execute).toHaveBeenCalledWith(1);
  });

  it('delete throws NotFoundException when BrandNotFoundError', async () => {
    deleteBrandV2UseCase.execute.mockRejectedValue(new BrandNotFoundError(1));
    await expect(controller.delete(1)).rejects.toThrow(NotFoundException);
  });
});
