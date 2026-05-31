import { Test, TestingModule } from '@nestjs/testing';

import { ProductUseCaseService } from '@products/application/product-use-case.service';
import { Product } from '@products/domain/models/product.entity';
import {
  CreateProductsDto,
  UpdateProductsDto,
} from '@products/infrastructure/adapters/in/v1/dtos/products.dto';

import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;
  let useCase: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  const product: Product = {
    id: 1,
    name: 'P',
    description: 'd',
    price: 10,
    stock: 5,
    image: 'img',
  };

  beforeEach(async () => {
    useCase = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductUseCaseService, useValue: useCase }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll delegates to the use-case', async () => {
    useCase.findAll.mockResolvedValue([product]);
    await expect(controller.getAll()).resolves.toEqual([product]);
    expect(useCase.findAll).toHaveBeenCalledWith();
  });

  it('getOne delegates to the use-case', async () => {
    useCase.findOne.mockResolvedValue(product);
    await expect(controller.getOne(1)).resolves.toEqual(product);
    expect(useCase.findOne).toHaveBeenCalledWith(1);
  });

  it('create delegates to the use-case', async () => {
    const payload = {
      name: 'P',
      description: 'd',
      price: 10,
      stock: 5,
      image: 'img',
    } as CreateProductsDto;
    useCase.create.mockResolvedValue(product);
    await expect(controller.create(payload)).resolves.toEqual(product);
    expect(useCase.create).toHaveBeenCalledWith(payload);
  });

  it('update delegates to the use-case', async () => {
    const payload = { name: 'New' } as UpdateProductsDto;
    useCase.update.mockResolvedValue(product);
    await expect(controller.update(1, payload)).resolves.toEqual(product);
    expect(useCase.update).toHaveBeenCalledWith(1, payload);
  });

  it('delete delegates to the use-case', async () => {
    useCase.delete.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(useCase.delete).toHaveBeenCalledWith(1);
  });
});
