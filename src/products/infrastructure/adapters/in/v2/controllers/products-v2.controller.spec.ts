import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { CreateProductV2UseCase } from '@products/application/create-product-v2.use-case.service';
import { GetAllProductsV2UseCase } from '@products/application/get-all-products-v2.use-case.service';
import { GetProductV2UseCase } from '@products/application/get-product-v2.use-case.service';
import { UpdateProductV2UseCase } from '@products/application/update-product-v2.use-case.service';
import { DeleteProductV2UseCase } from '@products/application/delete-product-v2.use-case.service';
import { Product } from '@products/domain/models/product.entity';
import { ProductNotFoundError } from '@products/domain/errors/product-not-found.error';
import {
  CreateProductV2Dto,
  UpdateProductV2Dto,
} from '@products/infrastructure/adapters/in/v2/dtos/products-v2.dto';

import { ProductsV2Controller } from './products-v2.controller';

describe('ProductsV2Controller', () => {
  let controller: ProductsV2Controller;
  let createProductV2UseCase: { execute: jest.Mock };
  let getAllProductsV2UseCase: { execute: jest.Mock };
  let getProductV2UseCase: { execute: jest.Mock };
  let updateProductV2UseCase: { execute: jest.Mock };
  let deleteProductV2UseCase: { execute: jest.Mock };

  const product: Product = {
    id: 1,
    name: 'P',
    description: 'd',
    price: 10,
    stock: 5,
    image: 'img',
  };

  beforeEach(async () => {
    createProductV2UseCase = { execute: jest.fn() };
    getAllProductsV2UseCase = { execute: jest.fn() };
    getProductV2UseCase = { execute: jest.fn() };
    updateProductV2UseCase = { execute: jest.fn() };
    deleteProductV2UseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsV2Controller],
      providers: [
        { provide: CreateProductV2UseCase, useValue: createProductV2UseCase },
        { provide: GetAllProductsV2UseCase, useValue: getAllProductsV2UseCase },
        { provide: GetProductV2UseCase, useValue: getProductV2UseCase },
        { provide: UpdateProductV2UseCase, useValue: updateProductV2UseCase },
        { provide: DeleteProductV2UseCase, useValue: deleteProductV2UseCase },
      ],
    }).compile();

    controller = module.get<ProductsV2Controller>(ProductsV2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll delegates to the use-case', async () => {
    getAllProductsV2UseCase.execute.mockResolvedValue([product]);
    await expect(controller.getAll()).resolves.toEqual([product]);
    expect(getAllProductsV2UseCase.execute).toHaveBeenCalledWith();
  });

  it('getOne delegates to the use-case', async () => {
    getProductV2UseCase.execute.mockResolvedValue(product);
    await expect(controller.getOne(1)).resolves.toEqual(product);
    expect(getProductV2UseCase.execute).toHaveBeenCalledWith(1);
  });

  it('getOne throws NotFoundException when ProductNotFoundError', async () => {
    getProductV2UseCase.execute.mockRejectedValue(new ProductNotFoundError(1));
    await expect(controller.getOne(1)).rejects.toThrow(NotFoundException);
  });

  it('create delegates to the use-case', async () => {
    const payload = {
      name: 'P',
      description: 'd',
      price: 10,
      stock: 5,
      image: 'img',
    } as CreateProductV2Dto;
    createProductV2UseCase.execute.mockResolvedValue(product);
    await expect(controller.create(payload)).resolves.toEqual(product);
    expect(createProductV2UseCase.execute).toHaveBeenCalled();
  });

  it('update delegates to the use-case', async () => {
    const payload = { name: 'New' } as UpdateProductV2Dto;
    updateProductV2UseCase.execute.mockResolvedValue(product);
    await expect(controller.update(1, payload)).resolves.toEqual(product);
    expect(updateProductV2UseCase.execute).toHaveBeenCalledWith(1, payload);
  });

  it('update throws NotFoundException when ProductNotFoundError', async () => {
    const payload = { name: 'New' } as UpdateProductV2Dto;
    updateProductV2UseCase.execute.mockRejectedValue(new ProductNotFoundError(1));
    await expect(controller.update(1, payload)).rejects.toThrow(NotFoundException);
  });

  it('delete delegates to the use-case', async () => {
    deleteProductV2UseCase.execute.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(deleteProductV2UseCase.execute).toHaveBeenCalledWith(1);
  });

  it('delete throws NotFoundException when ProductNotFoundError', async () => {
    deleteProductV2UseCase.execute.mockRejectedValue(new ProductNotFoundError(1));
    await expect(controller.delete(1)).rejects.toThrow(NotFoundException);
  });
});
