// --- Cobertura de branch: productsService opcional ---
describe('productsService dependency', () => {
  it('should throw if getOrdersByUser is called without productsService', () => {
    const serviceWithoutDep = new UsersService();
    expect(() => serviceWithoutDep.getOrdersByUser(1)).toThrow(
      'productsService dependency not provided',
    );
  });
});
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductUseCaseService } from '@products/application/product-use-case.service';
import { CreateUserDto } from '../dtos/user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let mockProductUseCaseService: jest.Mocked<any>;

  beforeEach(async () => {
    mockProductUseCaseService = {
      findAll: jest.fn().mockReturnValue([{ id: 1, name: 'Product 1', price: 1000 }]),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: ProductUseCaseService, useValue: mockProductUseCaseService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', () => {
      const result = service.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0].userName).toBe('admin');
    });
  });

  describe('findOne', () => {
    it('should return a user by id', () => {
      const user = service.findOne(1);
      expect(user).toBeDefined();
      expect(user.id).toBe(1);
      expect(user.userName).toBe('admin');
    });

    it('should throw NotFoundException if user is not found', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
      expect(() => service.findOne(999)).toThrow('User 999 not Found');
    });
  });

  describe('create', () => {
    it('should create a new user and return it', () => {
      const payload: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        userName: 'johndoe',
        password: 'password',
        role: 'user',
      };
      const newUser = service.create(payload);
      expect(newUser).toBeDefined();
      expect(newUser.id).toBe(2);
      expect(newUser.userName).toBe('johndoe');

      // Verify it was added to the list
      expect(service.findAll()).toHaveLength(2);
    });
  });

  describe('update', () => {
    it('should update a user and return the updated user', () => {
      const payload = { firstName: 'UpdatedName' };
      const updatedUser = service.update(1, payload);
      expect(updatedUser).toBeDefined();
      expect(updatedUser.firstName).toBe('UpdatedName');

      // Verify the value was actually updated in the store
      const user = service.findOne(1);
      expect(user.firstName).toBe('UpdatedName');
    });

    it('should throw NotFoundException if user to update does not exist', () => {
      expect(() => service.update(999, { firstName: 'Non-existent' })).toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a user successfully', () => {
      const initialCount = service.findAll().length;
      service.delete(1);
      const allUsers = service.findAll();
      expect(allUsers).toHaveLength(initialCount - 1);
      expect(() => service.findOne(1)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user to delete does not exist', () => {
      expect(() => service.delete(999)).toThrow(NotFoundException);
    });
  });

  describe('getOrdersByUser', () => {
    it('should return the orders of a user with products included', () => {
      const order = service.getOrdersByUser(1);
      expect(order).toBeDefined();
      expect(order.id).toBe(1);
      expect(order.user.id).toBe(1);
      expect(mockProductUseCaseService.findAll).toHaveBeenCalled();
      expect(order.products).toHaveLength(1);
      expect(order.products[0].name).toBe('Product 1');
    });
  });

  // --- Cobertura de branches: lista vacía ---
  describe('branches: empty users list', () => {
    beforeEach(() => {
      // Borrar el usuario inicial
      try {
        service.delete(1);
      } catch {}
    });

    it('should throw NotFoundException when updating in empty list', () => {
      expect(service.findAll()).toHaveLength(0);
      expect(() => service.update(1, { firstName: 'Nobody' })).toThrow(NotFoundException);
    });

    it('should throw NotFoundException when deleting in empty list', () => {
      expect(service.findAll()).toHaveLength(0);
      expect(() => service.delete(1)).toThrow(NotFoundException);
    });
  });
});
