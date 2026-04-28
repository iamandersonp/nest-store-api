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

import { Order } from '@users/domain/models/order.entity';
import type { UserRepository } from '@users/domain/ports/user.port';
import { USERS_SERVICE_PORT } from '@users/domain/ports/user.port';
import { CreateUserDto, UpdateUserDto } from '../domain/dtos/user.dto';
import type { User } from '../domain/models/user.entity';

/**
 * Users Controller
 *
 * @export
 * @class UsersController
 */
@Controller('users')
export class UsersController {
  /**
   * Creates an instance of UsersController.
   * @param {UsersService} service
   * @memberof UsersController
   */
  constructor(
    @Inject(USERS_SERVICE_PORT)
    private readonly service: UserRepository,
  ) {}

  /**
   * Get all users
   *
   * @return {*} {User[] | Promise<User[]>}
   * @memberof UsersController
   */
  @Get()
  getAll(): User[] | Promise<User[]> {
    return this.service.findAll();
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
    return this.service.findOne(userId);
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
    return this.service.getOrdersByUser(userId);
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
    return this.service.create(payload);
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
    return this.service.update(id, payload);
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
    return this.service.delete(id);
  }
}
