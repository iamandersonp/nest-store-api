import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomerDto } from '../dtos/customers.dto';
import { CustomersService } from './customers.service';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of customers', () => {
      const result = service.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('phone');
    });
  });

  describe('findOne', () => {
    it('should return a single customer by id', () => {
      const customer = service.findOne(1);
      expect(customer).toBeDefined();
      expect(customer.id).toBe(1);
      expect(customer.phone).toBe('123456789');
    });

    it('should throw a NotFoundException if customer not found', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
      expect(() => service.findOne(999)).toThrow('Customer #999 not found');
    });
  });

  describe('create', () => {
    it('should create a new customer and return it', () => {
      const payload: CreateCustomerDto = {
        phone: '987654321',
        photo: 'newphoto',
        idUser: 2,
      };
      const newCustomer = service.create(payload);
      expect(newCustomer).toBeDefined();
      expect(newCustomer.id).toBe(2);
      expect(newCustomer.phone).toBe('987654321');
      expect(newCustomer.photo).toBe('newphoto');
      expect(newCustomer.idUser).toBe(2);

      // Verify it was added
      const allCustomers = service.findAll();
      expect(allCustomers).toHaveLength(2);
    });
  });

  describe('update', () => {
    it('should update a customer and return the updated customer', () => {
      const payload = { phone: '555555555' };
      const updatedCustomer = service.update(1, payload);
      expect(updatedCustomer).toBeDefined();
      expect(updatedCustomer.phone).toBe('555555555');

      // Verify the value was actually updated in the store
      const customer = service.findOne(1);
      expect(customer.phone).toBe('555555555');
    });

    it('should throw a NotFoundException if customer to update does not exist', () => {
      expect(() => service.update(999, { phone: '000000000' })).toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a customer successfully', () => {
      const initialCount = service.findAll().length;
      service.delete(1);
      const allCustomers = service.findAll();
      expect(allCustomers).toHaveLength(initialCount - 1);
      expect(() => service.findOne(1)).toThrow(NotFoundException);
    });

    it('should throw a NotFoundException if customer to delete does not exist', () => {
      expect(() => service.delete(999)).toThrow(NotFoundException);
    });
  });
});
