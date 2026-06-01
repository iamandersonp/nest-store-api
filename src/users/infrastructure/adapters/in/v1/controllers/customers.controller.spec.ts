import { Test, TestingModule } from '@nestjs/testing';

import { CreateCustomerUseCase } from '@users/application/create-customer.use-case';
import { FindAllCustomersUseCase } from '@users/application/find-all-customers.use-case';
import { FindOneCustomerUseCase } from '@users/application/find-one-customer.use-case';
import { UpdateCustomerUseCase } from '@users/application/update-customer.use-case';
import { DeleteCustomerUseCase } from '@users/application/delete-customer.use-case';
import { Customer } from '@users/domain/models/customer.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '@users/infrastructure/adapters/in/v1/dtos/customers.dto';

import { CustomersController } from './customers.controller';

describe('CustomersController', () => {
  let controller: CustomersController;
  let createCustomerUseCase: { execute: jest.Mock };
  let findAllCustomersUseCase: { execute: jest.Mock };
  let findOneCustomerUseCase: { execute: jest.Mock };
  let updateCustomerUseCase: { execute: jest.Mock };
  let deleteCustomerUseCase: { execute: jest.Mock };

  const customer: Customer = { id: 1, phone: '+54', photo: 'img', idUser: 1 };

  beforeEach(async () => {
    createCustomerUseCase = { execute: jest.fn() };
    findAllCustomersUseCase = { execute: jest.fn() };
    findOneCustomerUseCase = { execute: jest.fn() };
    updateCustomerUseCase = { execute: jest.fn() };
    deleteCustomerUseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        { provide: CreateCustomerUseCase, useValue: createCustomerUseCase },
        { provide: FindAllCustomersUseCase, useValue: findAllCustomersUseCase },
        { provide: FindOneCustomerUseCase, useValue: findOneCustomerUseCase },
        { provide: UpdateCustomerUseCase, useValue: updateCustomerUseCase },
        { provide: DeleteCustomerUseCase, useValue: deleteCustomerUseCase },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll delegates to the use-case', async () => {
    findAllCustomersUseCase.execute.mockResolvedValue([customer]);
    await expect(controller.getAll()).resolves.toEqual([customer]);
    expect(findAllCustomersUseCase.execute).toHaveBeenCalledWith();
  });

  it('getOne delegates to the use-case', async () => {
    findOneCustomerUseCase.execute.mockResolvedValue(customer);
    await expect(controller.getOne(1)).resolves.toEqual(customer);
    expect(findOneCustomerUseCase.execute).toHaveBeenCalledWith(1);
  });

  it('create delegates to the use-case', async () => {
    const payload = { phone: '+54', photo: 'img', idUser: 1 } as CreateCustomerDto;
    createCustomerUseCase.execute.mockResolvedValue(customer);
    await expect(controller.create(payload)).resolves.toEqual(customer);
    expect(createCustomerUseCase.execute).toHaveBeenCalledWith(payload);
  });

  it('update delegates to the use-case', async () => {
    const payload = { phone: '+1' } as UpdateCustomerDto;
    updateCustomerUseCase.execute.mockResolvedValue(customer);
    await expect(controller.update(1, payload)).resolves.toEqual(customer);
    expect(updateCustomerUseCase.execute).toHaveBeenCalledWith(1, payload);
  });

  it('delete delegates to the use-case', async () => {
    deleteCustomerUseCase.execute.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(deleteCustomerUseCase.execute).toHaveBeenCalledWith(1);
  });
});
