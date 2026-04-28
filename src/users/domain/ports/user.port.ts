import { BasseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { InjectionToken } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Order } from '../models/order.entity';
import { User } from '../models/user.entity';

// Definimos el Token para la DI
export const USERS_SERVICE_PORT: InjectionToken = Symbol('USERS_SERVICE_PORT');

export interface UserRepository extends BasseCrudService<User, CreateUserDto, UpdateUserDto> {
  getOrdersByUser(userId: number): Order | Promise<Order>;
}
