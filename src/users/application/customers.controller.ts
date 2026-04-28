import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import type { BasseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { CUSTOMERS_SERVICE_PORT } from '@users/domain/ports/customer.port';
import { CreateCustomerDto, UpdateCustomerDto } from '../domain/dtos/customers.dto.';
import type { Customer } from '../domain/models/customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(
    @Inject(CUSTOMERS_SERVICE_PORT)
    private readonly service: BasseCrudService<Customer, CreateCustomerDto, UpdateCustomerDto>,
  ) {}

  /**
   * Get all Customers
   *
   * @return {*} {Customer[] | Promise<Customer[]>}
   * @memberof CustomersController
   */
  @Get()
  getAll(): Customer[] | Promise<Customer[]> {
    return this.service.findAll();
  }

  /**
   * Get one Customer
   *
   * @param {number} userId
   * @return {*} {Customer | Promise<Customer>}
   * @memberof CustomersController
   */
  @Get(':customerId')
  getOne(@Param('customerId', ParseIntPipe) customerId: number): Customer | Promise<Customer> {
    return this.service.findOne(customerId);
  }

  /**
   * Create a new Customer
   *
   * @param {CreateUserDto} payload - User data
   * @return {* } {Customer}
   * @memberof CustomersController
   */
  @Post()
  create(@Body() payload: CreateCustomerDto): Customer | Promise<Customer> {
    return this.service.create(payload);
  }

  /**
   * Update a Customer
   *
   * @param {number} id - User id
   * @param {UpdateCustomerDto} payload - User data
   * @return {*} {Customer | Promise<Customer>}
   * @memberof CustomersController
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ): Customer | Promise<Customer> {
    return this.service.update(id, payload);
  }

  /**
   * Delete a user
   *
   * @param {number} id - User id
   * @memberof CustomersController
   */
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): void | Promise<void> {
    return this.service.delete(id);
  }
}
