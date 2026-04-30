import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductUseCaseService } from '@products/application/product-use-case.service';
import { Product } from '@products/domain/models/product.entity';
import { Order } from '@users/domain/models/order.entity';
import { User } from '@users/domain/models/user.entity';
import { UserRepository } from '@users/domain/ports/user.port';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

/**
 * Users Service
 *
 * @export
 * @class UsersService
 */
@Injectable()
export class UsersService implements UserRepository {
  /**
   * Creates an instance of UsersService.
   * @param {ProductUseCaseService} productsService
   * @memberof UsersService
   */
  constructor(private readonly productsService: ProductUseCaseService) {}

  /**
   * Counter for the id
   *
   * @private
   * @memberof UsersService
   */
  private counterId = 1;

  /**
   * List of Users
   *
   * @private
   * @type {User[]}
   * @memberof UsersService
   */
  private users: User[] = [
    {
      id: 1,
      firstName: 'Anderson',
      lastName: 'Peñaloza',
      userName: 'admin',
      password: '123456',
      role: 'admin',
    },
  ];

  /**
   * Return all Users
   *
   * @return {User[]}
   * @memberof UsersService
   */
  findAll(): User[] {
    return this.users;
  }

  /**
   * Return a user specified by id
   *
   * @param {number} id -  The User id to return
   * @return {*} {User} the entity Users corresponding
   * @memberof UsersService
   */
  findOne(id: number): User {
    const user = this.users.find((item: User) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User ${id} not Found`);
    }
    return user;
  }

  /**
   * Create a new User with the specified payload data
   *
   * @param {CreateUserDto} payload - The Paypload with the user info
   * @return {*} {User} - The new Created user
   * @memberof UsersService
   */
  create(payload: CreateUserDto): User {
    this.counterId++;
    const newUser: User = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  /**
   * Update a user specified by id
   *
   * @param {number} id - The id of the user to update
   * @param {UpdateUserDto} payload - The payload data with the new information
   * @return {*} {User} - The updated user
   * @memberof UsersService
   */
  update(id: number, payload: UpdateUserDto): User {
    const userId = this.findIndex(id);
    if (userId === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    const product = this.findOne(id);
    this.users[userId] = {
      ...product,
      ...payload,
    };
    return this.users[id];
  }

  /**
   * Delete an User specified by id
   *
   * @param {number} id - the id of the user to delete
   * @memberof UsersService
   */
  delete(id: number): void {
    const userId = this.findIndex(id);
    if (userId === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.slice(userId, 1);
  }

  /**
   * Obtain the orders of a user
   *
   * @param {number} id - The id of the user
   * @return {*}  {Orders}
   * @memberof UsersService
   */
  getOrdersByUser(id: number): Order {
    const order: Order = {
      id: 1,
      date: new Date(),
      user: this.findOne(id),
      products: this.productsService.findAll() as Product[],
      total: 0,
    };
    return order;
  }

  /**
   * Obtain the usser index
   *
   * @private
   * @param {number} id - The id to find
   * @return {*} {number} - the userr index on the array
   * @memberof UsersService
   */
  private findIndex(id: number): number {
    return this.users.findIndex((item) => item.id === id);
  }
}
