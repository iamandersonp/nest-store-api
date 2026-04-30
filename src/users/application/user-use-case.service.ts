import { Inject, Injectable } from '@nestjs/common';
import { Order } from '@users/domain/models/order.entity';
import { User } from '@users/domain/models/user.entity';
import type { UserRepository } from '@users/domain/ports/user.port';
import { USERS_SERVICE_PORT } from '@users/domain/ports/user.port';
import { CreateUserDto, UpdateUserDto } from '@users/infrastructure/adapters/in/v1/dtos/user.dto';

@Injectable()
export class UserUseCaseService {
  constructor(
    @Inject(USERS_SERVICE_PORT)
    private readonly service: UserRepository,
  ) {}

  /**
   * Get All Users
   *
   * @return {*}  {(User[] | Promise<User[]>)}
   * @memberof UserUseCaseService
   */
  findAll(): User[] | Promise<User[]> {
    return this.service.findAll();
  }

  /**
   * Get a user by its id
   *
   * @param {number} userId
   * @return {*}  {(User | Promise<User>)}
   * @memberof UserUseCaseService
   */
  findOne(userId: number): User | Promise<User> {
    return this.service.findOne(userId);
  }

  /**
   * Get user orders by its id
   *
   * @param {number} userId
   * @return {*}  {(Order | Promise<Order>)}
   * @memberof UserUseCaseService
   */
  getOrdersByUser(userId: number): Order | Promise<Order> {
    return this.service.getOrdersByUser(userId);
  }

  /**
   * Create a new user
   *
   * @param {CreateUserDto} payload
   * @return {*}  {(User | Promise<User>)}
   * @memberof UserUseCaseService
   */
  create(payload: CreateUserDto): User | Promise<User> {
    return this.service.create(payload);
  }

  /**
   * Udate an user by its id
   *
   * @param {number} id
   * @param {UpdateUserDto} payload
   * @return {*}  {(User | Promise<User>)}
   * @memberof UserUseCaseService
   */
  update(id: number, payload: UpdateUserDto): User | Promise<User> {
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
