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

import { UserUseCaseService } from '@users/application/user-use-case.service';
import { Order } from '@users/domain/models/order.entity';
import type { User } from '../../../../../domain/models/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

/**
 * Users Controller
 *
 * @export
 * @class UsersController
 */
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  /**
   * Creates an instance of UsersController.
   * @param {UserUseCaseService} service
   * @memberof UsersController
   */
  constructor(private readonly useCase: UserUseCaseService) {}

  /**
   * Get all users
   *
   * @return {*} {User[] | Promise<User[]>}
   * @memberof UsersController
   */
  @Get()
  getAll(): User[] | Promise<User[]> {
    return this.useCase.findAll();
  }

  /**
   * Get one user
   *
   * @param {number} userId
   * @return {*} {User | Promise<User>}
   * @memberof UsersController
   */
  @Get(':userId')
  getOne(@Param('userId', ParseIntPipe) userId: number): User | Promise<User> {
    return this.useCase.findOne(userId);
  }

  /**
   * Get the list of orders from a user
   *
   * @param {number} userId
   * @return {*} {Order | Promise<Order>}
   * @memberof UsersController
   */
  @Get(':userId/orders')
  getOrders(@Param('userId', ParseIntPipe) userId: number): Order | Promise<Order> {
    return this.useCase.getOrdersByUser(userId);
  }

  /**
   * Create a new user
   *
   * @param {CreateUserDto} payload - User data
   * @return {* } {User | Promise<User>}
   * @memberof UsersController
   */
  @Post()
  create(@Body() payload: CreateUserDto): User | Promise<User> {
    return this.useCase.create(payload);
  }

  /**
   * Update a user
   *
   * @param {number} id - User id
   * @param {UpdateUserDto} payload - User data
   * @return {*} {User | Promise<User>}
   * @memberof UsersController
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ): User | Promise<User> {
    return this.useCase.update(id, payload);
  }

  /**
   * Delete a user
   *
   * @param {number} id - User id
   * @memberof UsersController
   */
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): void | Promise<void> {
    return this.useCase.delete(id);
  }
}
