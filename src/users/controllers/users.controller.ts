import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from '../dtos/users-dto.interface';

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
  getProducts() {
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
  getOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
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
    return this.usersService.delete(id);
  }
}
