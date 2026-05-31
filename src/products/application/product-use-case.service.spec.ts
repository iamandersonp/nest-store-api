import { Test, TestingModule } from '@nestjs/testing';

import { Product } from '@products/domain/models/product.entity';
import { PRODUCTS_SERVICE_PORT } from '@products/domain/ports/product.port';
import {
  CreateProductsDto,
  UpdateProductsDto,
} from '@products/infrastructure/adapters/in/v1/dtos/products.dto';

import { ProductUseCaseService } from './product-use-case.service';

describe('ProductUseCaseService', () => {
  let useCase: ProductUseCaseService;
  let port: {
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
    port = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductUseCaseService, { provide: PRODUCTS_SERVICE_PORT, useValue: port }],
    }).compile();

    useCase = module.get<ProductUseCaseService>(ProductUseCaseService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('findAll delegates to the port', async () => {
    port.findAll.mockResolvedValue([product]);
    await expect(useCase.findAll()).resolves.toEqual([product]);
    expect(port.findAll).toHaveBeenCalledWith();
  });

  it('findOne delegates to the port', async () => {
    port.findOne.mockResolvedValue(product);
    await expect(useCase.findOne(1)).resolves.toEqual(product);
    expect(port.findOne).toHaveBeenCalledWith(1);
  });

  it('create delegates to the port', async () => {
    const payload: CreateProductsDto = {
      name: 'P',
      description: 'd',
      price: 10,
      stock: 5,
      image: 'img',
    };
    port.create.mockResolvedValue(product);
    await expect(useCase.create(payload)).resolves.toEqual(product);
    expect(port.create).toHaveBeenCalledWith(payload);
  });

  it('update delegates to the port', async () => {
    const payload = { name: 'New' } as UpdateProductsDto;
    port.update.mockResolvedValue(product);
    await expect(useCase.update(1, payload)).resolves.toEqual(product);
    expect(port.update).toHaveBeenCalledWith(1, payload);
  });

  it('delete delegates to the port', async () => {
    port.delete.mockResolvedValue(undefined);
    await expect(useCase.delete(1)).resolves.toBeUndefined();
    expect(port.delete).toHaveBeenCalledWith(1);
  });
});
