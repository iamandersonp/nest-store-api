import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '../dtos/customers-dto.interface';

@Controller('customers')
export class CustomersController {
  constructor(private service: CustomersService) {}

  /**
   * Get all users
   *
   * @return {*} {User[]}
   * @memberof UsersController
   */
  @Get()
  getAll() {
    return this.service.findAll();
  }

  /**
   * Get one user
   *
   * @param {number} userId
   * @return {*} {User}
   * @memberof UsersController
   */
  @Get(':customerId')
  getOne(
    @Param('customerId', ParseIntPipe) customerId: number,
  ) {
    return this.service.findOne(customerId);
  }

  /**
   * Create a new user
   *
   * @param {CreateUserDto} payload - User data
   * @return {* } {User}
   * @memberof UsersController
   */
  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.service.create(payload);
  }

  /**
   * Update a user
   *
   * @param {number} id - User id
   * @param {UpdateUserDto} payload - User data
   * @return {*} {User}
   * @memberof UsersController
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.service.update(id, payload);
  }

  /**
   * Delete a user
   *
   * @param {number} id - User id
   * @return {*} {User}
   * @memberof UsersController
   */
  @Delete()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
