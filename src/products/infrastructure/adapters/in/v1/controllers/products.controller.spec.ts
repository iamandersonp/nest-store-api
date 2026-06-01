import { Test, TestingModule } from '@nestjs/testing';

import { CreateProductUseCase } from '@products/application/create-product.use-case';
import { FindAllProductsUseCase } from '@products/application/find-all-products.use-case';
import { FindOneProductUseCase } from '@products/application/find-one-product.use-case';
import { UpdateProductUseCase } from '@products/application/update-product.use-case';
import { DeleteProductUseCase } from '@products/application/delete-product.use-case';
import { Product } from '@products/domain/models/product.entity';
import {
  CreateProductsDto,
  UpdateProductsDto,
} from '@products/infrastructure/adapters/in/v1/dtos/products.dto';

import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;
  let createProductUseCase: { execute: jest.Mock };
  let findAllProductsUseCase: { execute: jest.Mock };
  let findOneProductUseCase: { execute: jest.Mock };
  let updateProductUseCase: { execute: jest.Mock };
  let deleteProductUseCase: { execute: jest.Mock };

  const product: Product = {
    id: 1,
    name: 'P',
    description: 'd',
    price: 10,
    stock: 5,
    image: 'img',
  };

  beforeEach(async () => {
    createProductUseCase = { execute: jest.fn() };
    findAllProductsUseCase = { execute: jest.fn() };
    findOneProductUseCase = { execute: jest.fn() };
    updateProductUseCase = { execute: jest.fn() };
    deleteProductUseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        { provide: CreateProductUseCase, useValue: createProductUseCase },
        { provide: FindAllProductsUseCase, useValue: findAllProductsUseCase },
        { provide: FindOneProductUseCase, useValue: findOneProductUseCase },
        { provide: UpdateProductUseCase, useValue: updateProductUseCase },
        { provide: DeleteProductUseCase, useValue: deleteProductUseCase },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll delegates to the use-case', async () => {
    findAllProductsUseCase.execute.mockResolvedValue([product]);
    await expect(controller.getAll()).resolves.toEqual([product]);
    expect(findAllProductsUseCase.execute).toHaveBeenCalledWith();
  });

  it('getOne delegates to the use-case', async () => {
    findOneProductUseCase.execute.mockResolvedValue(product);
    await expect(controller.getOne(1)).resolves.toEqual(product);
    expect(findOneProductUseCase.execute).toHaveBeenCalledWith(1);
  });

  it('create delegates to the use-case', async () => {
    const payload = {
      name: 'P',
      description: 'd',
      price: 10,
      stock: 5,
      image: 'img',
    } as CreateProductsDto;
    createProductUseCase.execute.mockResolvedValue(product);
    await expect(controller.create(payload)).resolves.toEqual(product);
    expect(createProductUseCase.execute).toHaveBeenCalled();
  });

  it('update delegates to the use-case', async () => {
    const payload = { name: 'New' } as UpdateProductsDto;
    updateProductUseCase.execute.mockResolvedValue(product);
    await expect(controller.update(1, payload)).resolves.toEqual(product);
    expect(updateProductUseCase.execute).toHaveBeenCalledWith(1, payload);
  });

  it('delete delegates to the use-case', async () => {
    deleteProductUseCase.execute.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(deleteProductUseCase.execute).toHaveBeenCalledWith(1);
  });
});
