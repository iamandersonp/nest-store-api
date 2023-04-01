import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users } from '../models/users.interface';
import {
  CreateUserDto,
  UpdateUserDto,
} from '../dtos/users-dto.interface';
import { Orders } from '../models/orders.interface';
import { ProductsService } from '../../products/services/products.service';

/**
 * Users Service
 *
 * @export
 * @class UsersService
 */
@Injectable()
export class UsersService {
  /**
   * Creates an instance of UsersService.
   * @param {ProductsService} productsService
   * @memberof UsersService
   */
  constructor(private productsService: ProductsService) {}

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
   * @type {Users[]}
   * @memberof UsersService
   */
  private users: Users[] = [
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
   * @return {Users[]}
   * @memberof UsersService
   */
  findAll() {
    return this.users;
  }

  /**
   * Return a user specified by id
   *
   * @param {number} id -  The User id to return
   * @return {Users} the entity Users corresponding
   * @memberof UsersService
   */
  findOne(id: number) {
    const user = this.users.find(
      (item: Users) => item.id === id,
    );
    if (!user) {
      throw new NotFoundException(`User ${id} not Found`);
    }
    return user;
  }

  /**
   * Create a new User with the specified payload data
   *
   * @param {CreateUserDto} payload - The Paypload with the user info
   * @return {User} - The new Created user
   * @memberof UsersService
   */
  create(payload: CreateUserDto) {
    this.counterId++;
    const newUser: Users = {
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
   * @return {Users} - The updated user
   * @memberof UsersService
   */
  update(id: number, payload: UpdateUserDto) {
    const productId = this.findIndex(id);
    if (productId != 1) {
      const product = this.findOne(id);
      this.users[productId] = {
        ...product,
        ...payload,
      };
      return this.users[id];
    }
    return null;
  }

  /**
   * Delete an User specified by id
   *
   * @param {number} id - the id of the user to delete
   * @memberof UsersService
   */
  delete(id: number) {
    const productId = this.findIndex(id);
    if (productId === -1) {
      throw new NotFoundException(`User ${id} not Found`);
    }
    this.users.slice(productId, 1);
  }

  /**
   * Obtain the orders of a user
   *
   * @param {number} id - The id of the user
   * @return {*}  {Orders}
   * @memberof UsersService
   */
  getOrdersByUser(id: number): Orders {
    const order: Orders = {
      id: 1,
      date: new Date(),
      user: this.findOne(id),
      products: this.productsService.findAll(),
      total: 0,
    };
    return order;
  }

  /**
   * Obtain an User from by a given id
   *
   * @private
   * @param {number} id - The id to find
   * @return {Users} - the user found
   * @memberof UsersService
   */
  private findIndex(id: number) {
    return this.users.findIndex((item) => item.id === id);
  }
}
