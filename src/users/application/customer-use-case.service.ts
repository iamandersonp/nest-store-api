import type { BasseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Customer } from '@users/domain/models/customer.entity';
import { CUSTOMERS_SERVICE_PORT } from '@users/domain/ports/customer.port';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '@users/infrastructure/adapters/in/v1/dtos/customers.dto.';

@Injectable()
export class CustomerUseCaseService {
  /**
   * Creates an instance of CustomerCaseService.
   * @param {BasseCrudService<Customer, CreateCustomerDto, UpdateCustomerDto>} service
   * @memberof CustomerCaseService
   */
  constructor(
    @Inject(CUSTOMERS_SERVICE_PORT)
    private readonly service: BasseCrudService<Customer, CreateCustomerDto, UpdateCustomerDto>,
  ) {}

  /**
   * Get All Users
   *
   * @return {*}  {Customer[] | Promise<Customer[]>}
   * @memberof UserUseCaseService
   */
  findAll(): Customer[] | Promise<Customer[]> {
    return this.service.findAll();
  }

  /**
   * Get a user by its id
   *
   * @param {number} userId
   * @return {*}  {Customer | Promise<Customer>)}
   * @memberof UserUseCaseService
   */
  findOne(userId: number): Customer | Promise<Customer> {
    return this.service.findOne(userId);
  }

  /**
   * Create a new user
   *
   * @param {CreateCustomerDto} payload
   * @return {*}  {Customer | Promise<Customer>}
   * @memberof UserUseCaseService
   */
  create(payload: CreateCustomerDto): Customer | Promise<Customer> {
    return this.service.create(payload);
  }

  /**
   * Udate an user by its id
   *
   * @param {number} id
   * @param {UpdateCustomerDto} payload
   * @return {*}  {(User | Promise<User>)}
   * @memberof UserUseCaseService
   */
  update(id: number, payload: UpdateCustomerDto): Customer | Promise<Customer> {
    return this.service.update(id, payload);
  }

  /**
   * Delete an user by its id
   *
   * @param {number} id
   * @return {*}  {(void | Promise<void>)}
   * @memberof UserUseCaseService
   */
  delete(id: number): void | Promise<void> {
    return this.service.delete(id);
  }
}
