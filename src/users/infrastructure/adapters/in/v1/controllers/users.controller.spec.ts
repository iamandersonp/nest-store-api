import { Test, TestingModule } from '@nestjs/testing';

import { UserUseCaseService } from '@users/application/user-use-case.service';
import { Order } from '@users/domain/models/order.entity';
import { User } from '@users/domain/models/user.entity';
import { CreateUserDto, UpdateUserDto } from '@users/infrastructure/adapters/in/v1/dtos/user.dto';

import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let useCase: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    getOrdersByUser: jest.Mock;
  };

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
    useCase = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      getOrdersByUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UserUseCaseService, useValue: useCase }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll delegates to the use-case', async () => {
    useCase.findAll.mockResolvedValue([user]);
    await expect(controller.getAll()).resolves.toEqual([user]);
    expect(useCase.findAll).toHaveBeenCalledWith();
  });

  it('getOne delegates to the use-case', async () => {
    useCase.findOne.mockResolvedValue(user);
    await expect(controller.getOne(1)).resolves.toEqual(user);
    expect(useCase.findOne).toHaveBeenCalledWith(1);
  });

  it('getOrders delegates to the use-case', async () => {
    useCase.getOrdersByUser.mockResolvedValue(order);
    await expect(controller.getOrders(1)).resolves.toEqual(order);
    expect(useCase.getOrdersByUser).toHaveBeenCalledWith(1);
  });

  it('create delegates to the use-case', async () => {
    const payload: CreateUserDto = {
      firstName: 'F',
      lastName: 'L',
      userName: 'u',
      password: 'p',
      role: 'admin',
    };
    useCase.create.mockResolvedValue(user);
    await expect(controller.create(payload)).resolves.toEqual(user);
    expect(useCase.create).toHaveBeenCalledWith(payload);
  });

  it('update delegates to the use-case', async () => {
    const payload = { firstName: 'New' } as UpdateUserDto;
    useCase.update.mockResolvedValue(user);
    await expect(controller.update(1, payload)).resolves.toEqual(user);
    expect(useCase.update).toHaveBeenCalledWith(1, payload);
  });

  it('delete delegates to the use-case', async () => {
    useCase.delete.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(useCase.delete).toHaveBeenCalledWith(1);
  });
});
