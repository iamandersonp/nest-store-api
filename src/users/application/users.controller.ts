import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../domain/dtos/user.dto';
import type { User } from '../domain/models/user.entity';
import { UsersService } from '../infrastructure/users.service';

/**
 * Users Controller
 *
 * @export
 * @class UsersController
 */
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * Get all users
   *
   * @return {*} {User[]}
   * @memberof UsersController
   */
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  /**
   * Get one user
   *
   * @param {number} userId
   * @return {*} {User}
   * @memberof UsersController
   */
  @Get(':userId')
  getOne(@Param('userId', ParseIntPipe) userId: number): User {
    return this.usersService.findOne(userId);
  }

  /**
   * Get the list of orders from a user
   *
   * @param {number} userId
   * @return {*}
   * @memberof UsersController
   */
  @Get(':userId/orders')
  getOrders(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.getOrdersByUser(userId);
  }

  /**
   * Create a new user
   *
   * @param {CreateUserDto} payload - User data
   * @return {* } {User}
   * @memberof UsersController
   */
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
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
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  /**
   * Delete a user
   *
   * @param {number} id - User id
   * @memberof UsersController
   */
  @Delete()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
