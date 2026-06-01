import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateCustomerUseCase } from '@users/application/create-customer.use-case';
import { FindAllCustomersUseCase } from '@users/application/find-all-customers.use-case';
import { FindOneCustomerUseCase } from '@users/application/find-one-customer.use-case';
import { UpdateCustomerUseCase } from '@users/application/update-customer.use-case';
import { DeleteCustomerUseCase } from '@users/application/delete-customer.use-case';
import type { Customer } from '../../../../../domain/models/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Controller({
  path: 'customers',
  version: '1',
})
export class CustomersController {
  /**
   * Creates an instance of CustomersController.
   * @memberof CustomersController
   */
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly findAllCustomersUseCase: FindAllCustomersUseCase,
    private readonly findOneCustomerUseCase: FindOneCustomerUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
    private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
  ) {}

  /**
   * Get all Customers
   *
   * @return {*} {Customer[] | Promise<Customer[]>}
   * @memberof CustomersController
   */
  @Get()
  getAll(): Customer[] | Promise<Customer[]> {
    return this.findAllCustomersUseCase.execute();
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
    return this.findOneCustomerUseCase.execute(customerId);
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
    return this.createCustomerUseCase.execute(payload);
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
    return this.updateCustomerUseCase.execute(id, payload);
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
    return this.deleteCustomerUseCase.execute(id);
  }
}
