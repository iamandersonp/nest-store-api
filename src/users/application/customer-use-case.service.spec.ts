import { Test, TestingModule } from '@nestjs/testing';

import { Customer } from '@users/domain/models/customer.entity';
import { CUSTOMERS_SERVICE_PORT } from '@users/domain/ports/customer.port';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '@users/infrastructure/adapters/in/v1/dtos/customers.dto';

import { CustomerUseCaseService } from './customer-use-case.service';

describe('CustomerUseCaseService', () => {
  let useCase: CustomerUseCaseService;
  let port: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  const customer: Customer = { id: 1, phone: '+54', photo: 'img', idUser: 1 };

  beforeEach(async () => {
    port = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerUseCaseService, { provide: CUSTOMERS_SERVICE_PORT, useValue: port }],
    }).compile();

    useCase = module.get<CustomerUseCaseService>(CustomerUseCaseService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('findAll delegates to the port', async () => {
    port.findAll.mockResolvedValue([customer]);
    await expect(useCase.findAll()).resolves.toEqual([customer]);
    expect(port.findAll).toHaveBeenCalledWith();
  });

  it('findOne delegates to the port', async () => {
    port.findOne.mockResolvedValue(customer);
    await expect(useCase.findOne(1)).resolves.toEqual(customer);
    expect(port.findOne).toHaveBeenCalledWith(1);
  });

  it('create delegates to the port', async () => {
    const payload = { phone: '+54', photo: 'img', idUser: 1 } as CreateCustomerDto;
    port.create.mockResolvedValue(customer);
    await expect(useCase.create(payload)).resolves.toEqual(customer);
    expect(port.create).toHaveBeenCalledWith(payload);
  });

  it('update delegates to the port', async () => {
    const payload = { phone: '+1' } as UpdateCustomerDto;
    port.update.mockResolvedValue(customer);
    await expect(useCase.update(1, payload)).resolves.toEqual(customer);
    expect(port.update).toHaveBeenCalledWith(1, payload);
  });

  it('delete delegates to the port', async () => {
    port.delete.mockResolvedValue(undefined);
    await expect(useCase.delete(1)).resolves.toBeUndefined();
    expect(port.delete).toHaveBeenCalledWith(1);
  });
});
