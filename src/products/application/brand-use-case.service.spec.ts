import { Test, TestingModule } from '@nestjs/testing';

import { Brand } from '@products/domain/models/brand.entity';
import { BRANDS_SERVICE_PORT } from '@products/domain/ports/brand.port';
import { UpdateBrandDto } from '@products/infrastructure/adapters/in/v1/dtos/brands.dto';

import { BrandUseCaseService } from './brand-use-case.service';

describe('BrandUseCaseService', () => {
  let useCase: BrandUseCaseService;
  let port: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  const brand: Brand = { id: 1, name: 'B', image: 'img' };

  beforeEach(async () => {
    port = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandUseCaseService, { provide: BRANDS_SERVICE_PORT, useValue: port }],
    }).compile();

    useCase = module.get<BrandUseCaseService>(BrandUseCaseService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('findAll delegates to the port', async () => {
    port.findAll.mockResolvedValue([brand]);
    await expect(useCase.findAll()).resolves.toEqual([brand]);
    expect(port.findAll).toHaveBeenCalledWith();
  });

  it('findOne delegates to the port', async () => {
    port.findOne.mockResolvedValue(brand);
    await expect(useCase.findOne(1)).resolves.toEqual(brand);
    expect(port.findOne).toHaveBeenCalledWith(1);
  });

  it('create delegates to the port', async () => {
    const payload = { name: 'B', image: 'img' };
    port.create.mockResolvedValue(brand);
    await expect(useCase.create(payload)).resolves.toEqual(brand);
    expect(port.create).toHaveBeenCalledWith(payload);
  });

  it('update delegates to the port', async () => {
    const payload = { name: 'New' } as UpdateBrandDto;
    port.update.mockResolvedValue(brand);
    await expect(useCase.update(1, payload)).resolves.toEqual(brand);
    expect(port.update).toHaveBeenCalledWith(1, payload);
  });

  it('delete delegates to the port', async () => {
    port.delete.mockResolvedValue(undefined);
    await expect(useCase.delete(1)).resolves.toBeUndefined();
    expect(port.delete).toHaveBeenCalledWith(1);
  });
});
