import { Test, TestingModule } from '@nestjs/testing';

import { Order } from '@users/domain/models/order.entity';
import { User } from '@users/domain/models/user.entity';
import { USERS_SERVICE_PORT } from '@users/domain/ports/user.port';
import { CreateUserDto, UpdateUserDto } from '@users/infrastructure/adapters/in/v1/dtos/user.dto';

import { UserUseCaseService } from './user-use-case.service';

describe('UserUseCaseService', () => {
  let useCase: UserUseCaseService;
  let port: {
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
    port = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      getOrdersByUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserUseCaseService, { provide: USERS_SERVICE_PORT, useValue: port }],
    }).compile();

    useCase = module.get<UserUseCaseService>(UserUseCaseService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('findAll delegates to the port', async () => {
    port.findAll.mockResolvedValue([user]);
    await expect(useCase.findAll()).resolves.toEqual([user]);
    expect(port.findAll).toHaveBeenCalledWith();
  });

  it('findOne delegates to the port', async () => {
    port.findOne.mockResolvedValue(user);
    await expect(useCase.findOne(1)).resolves.toEqual(user);
    expect(port.findOne).toHaveBeenCalledWith(1);
  });

  it('getOrdersByUser delegates to the port', async () => {
    port.getOrdersByUser.mockResolvedValue(order);
    await expect(useCase.getOrdersByUser(1)).resolves.toEqual(order);
    expect(port.getOrdersByUser).toHaveBeenCalledWith(1);
  });

  it('create delegates to the port', async () => {
    const payload: CreateUserDto = {
      firstName: 'F',
      lastName: 'L',
      userName: 'u',
      password: 'p',
      role: 'admin',
    };
    port.create.mockResolvedValue(user);
    await expect(useCase.create(payload)).resolves.toEqual(user);
    expect(port.create).toHaveBeenCalledWith(payload);
  });

  it('update delegates to the port', async () => {
    const payload = { firstName: 'New' } as UpdateUserDto;
    port.update.mockResolvedValue(user);
    await expect(useCase.update(1, payload)).resolves.toEqual(user);
    expect(port.update).toHaveBeenCalledWith(1, payload);
  });

  it('delete delegates to the port', async () => {
    port.delete.mockResolvedValue(undefined);
    await expect(useCase.delete(1)).resolves.toBeUndefined();
    expect(port.delete).toHaveBeenCalledWith(1);
  });
});
