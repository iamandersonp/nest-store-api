import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserUseCase } from '@users/application/create-user.use-case';
import { FindAllUsersUseCase } from '@users/application/find-all-users.use-case';
import { FindOneUserUseCase } from '@users/application/find-one-user.use-case';
import { UpdateUserUseCase } from '@users/application/update-user.use-case';
import { DeleteUserUseCase } from '@users/application/delete-user.use-case';
import { GetOrdersByUserUseCase } from '@users/application/get-orders-by-user.use-case';
import { Order } from '@users/domain/models/order.entity';
import { User } from '@users/domain/models/user.entity';
import { CreateUserDto, UpdateUserDto } from '@users/infrastructure/adapters/in/v1/dtos/user.dto';

import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let createUserUseCase: { execute: jest.Mock };
  let findAllUsersUseCase: { execute: jest.Mock };
  let findOneUserUseCase: { execute: jest.Mock };
  let updateUserUseCase: { execute: jest.Mock };
  let deleteUserUseCase: { execute: jest.Mock };
  let getOrdersByUserUseCase: { execute: jest.Mock };

  const user: User = {
    id: 1,
    firstName: 'F',
    lastName: 'L',
    userName: 'u',
    password: 'p',
    role: 'admin',
  };

  const order: Order = {
    id: 1,
    date: new Date('2026-01-01T00:00:00Z'),
    user,
    products: [],
    total: 0,
  };

  beforeEach(async () => {
    createUserUseCase = { execute: jest.fn() };
    findAllUsersUseCase = { execute: jest.fn() };
    findOneUserUseCase = { execute: jest.fn() };
    updateUserUseCase = { execute: jest.fn() };
    deleteUserUseCase = { execute: jest.fn() };
    getOrdersByUserUseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: CreateUserUseCase, useValue: createUserUseCase },
        { provide: FindAllUsersUseCase, useValue: findAllUsersUseCase },
        { provide: FindOneUserUseCase, useValue: findOneUserUseCase },
        { provide: UpdateUserUseCase, useValue: updateUserUseCase },
        { provide: DeleteUserUseCase, useValue: deleteUserUseCase },
        { provide: GetOrdersByUserUseCase, useValue: getOrdersByUserUseCase },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll delegates to the use-case', async () => {
    findAllUsersUseCase.execute.mockResolvedValue([user]);
    await expect(controller.getAll()).resolves.toEqual([user]);
    expect(findAllUsersUseCase.execute).toHaveBeenCalledWith();
  });

  it('getOne delegates to the use-case', async () => {
    findOneUserUseCase.execute.mockResolvedValue(user);
    await expect(controller.getOne(1)).resolves.toEqual(user);
    expect(findOneUserUseCase.execute).toHaveBeenCalledWith(1);
  });

  it('getOrders delegates to the use-case', async () => {
    getOrdersByUserUseCase.execute.mockResolvedValue(order);
    await expect(controller.getOrders(1)).resolves.toEqual(order);
    expect(getOrdersByUserUseCase.execute).toHaveBeenCalledWith(1);
  });

  it('create delegates to the use-case', async () => {
    const payload: CreateUserDto = {
      firstName: 'F',
      lastName: 'L',
      userName: 'u',
      password: 'p',
      role: 'admin',
    };
    createUserUseCase.execute.mockResolvedValue(user);
    await expect(controller.create(payload)).resolves.toEqual(user);
    expect(createUserUseCase.execute).toHaveBeenCalledWith(payload);
  });

  it('update delegates to the use-case', async () => {
    const payload = { firstName: 'New' } as UpdateUserDto;
    updateUserUseCase.execute.mockResolvedValue(user);
    await expect(controller.update(1, payload)).resolves.toEqual(user);
    expect(updateUserUseCase.execute).toHaveBeenCalledWith(1, payload);
  });

  it('delete delegates to the use-case', async () => {
    deleteUserUseCase.execute.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(deleteUserUseCase.execute).toHaveBeenCalledWith(1);
  });
});
