import { Test, TestingModule } from '@nestjs/testing';

import { CustomerUseCaseService } from '@users/application/customer-use-case.service';
import { Customer } from '@users/domain/models/customer.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '@users/infrastructure/adapters/in/v1/dtos/customers.dto';

import { CustomersController } from './customers.controller';

describe('CustomersController', () => {
  let controller: CustomersController;
  let useCase: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  const customer: Customer = { id: 1, phone: '+54', photo: 'img', idUser: 1 };

  beforeEach(async () => {
    useCase = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [{ provide: CustomerUseCaseService, useValue: useCase }],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll delegates to the use-case', async () => {
    useCase.findAll.mockResolvedValue([customer]);
    await expect(controller.getAll()).resolves.toEqual([customer]);
    expect(useCase.findAll).toHaveBeenCalledWith();
  });

  it('getOne delegates to the use-case', async () => {
    useCase.findOne.mockResolvedValue(customer);
    await expect(controller.getOne(1)).resolves.toEqual(customer);
    expect(useCase.findOne).toHaveBeenCalledWith(1);
  });

  it('create delegates to the use-case', async () => {
    const payload = { phone: '+54', photo: 'img', idUser: 1 } as CreateCustomerDto;
    useCase.create.mockResolvedValue(customer);
    await expect(controller.create(payload)).resolves.toEqual(customer);
    expect(useCase.create).toHaveBeenCalledWith(payload);
  });

  it('update delegates to the use-case', async () => {
    const payload = { phone: '+1' } as UpdateCustomerDto;
    useCase.update.mockResolvedValue(customer);
    await expect(controller.update(1, payload)).resolves.toEqual(customer);
    expect(useCase.update).toHaveBeenCalledWith(1, payload);
  });

  it('delete delegates to the use-case', async () => {
    useCase.delete.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(useCase.delete).toHaveBeenCalledWith(1);
  });
});
