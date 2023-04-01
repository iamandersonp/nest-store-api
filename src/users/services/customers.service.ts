import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Customer } from '../models/customer.interface';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '../dtos/customers-dto.interface';

@Injectable()
export class CustomersService {
  /**
   * Counter for the id
   *
   * @private
   * @memberof CustomersService
   */
  private counterId = 1;

  private customers: Customer[] = [
    {
      id: 1,
      phone: '123456789',
      photo: 'photo',
      idUser: 1,
    },
  ];

  /**
   * Return all Customers
   *
   * @return {*}  {Customer[]}
   * @memberof CustomersService
   */
  findAll(): Customer[] {
    return this.customers;
  }

  /**
   * Find a Customer by id
   *
   * @param {number} id - The id of the Customer to find
   * @return {*}  {Customer}
   * @memberof CustomersService
   */
  findOne(id: number): Customer {
    const customer = this.customers.find(
      (item) => item.id === id,
    );
    if (!customer) {
      throw new NotFoundException(
        `Customer #${id} not found`,
      );
    }
    return customer;
  }

  /**
   * Create a new Customer
   *
   * @param {CreateCustomerDto} payload - The Customer to create
   * @return {*}  {Customer}
   * @memberof CustomersService
   */
  create(payload: CreateCustomerDto): Customer {
    this.counterId = this.counterId + 1;
    const newCustomer: Customer = {
      ...payload,
      id: this.counterId,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  /**
   * Update a Customer
   *
   * @param {number} id - The id of the Customer to update
   * @param {CreateCustomerDto} payload - The Customer to update
   * @return {*}  {Customer}
   * @memberof CustomersService
   */
  update(id: number, payload: UpdateCustomerDto): Customer {
    const index = this.findIndex(id);
    if (index !== 1) {
      const updatedCustomer: Customer = {
        ...this.customers[index],
        ...payload,
      };
      this.customers[index] = updatedCustomer;
      return updatedCustomer;
    }
    return null;
  }

  /**
   * Delete a Customer
   *
   * @param {number} id - The id of the Customer to delete
   * @return {*}  {boolean}
   * @memberof CustomersService
   */
  delete(id: number) {
    const index = this.findIndex(id);
    if (index == -1) {
      throw new NotFoundException(
        `Customer ${id} not Found`,
      );
    }
    this.customers.splice(index, 1);
  }

  /**
   * Find the index of the Customer in the list
   *
   * @private
   * @param {number} id - The id of the Customer to find
   * @return {*}  {number}
   * @memberof CustomersService
   */
  private findIndex(id: number): number {
    return this.customers.findIndex(
      (item) => item.id === id,
    );
  }
}
