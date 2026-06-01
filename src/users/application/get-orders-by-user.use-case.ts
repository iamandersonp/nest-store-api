import { Inject, Injectable } from '@nestjs/common';
import { USERS_SERVICE_PORT, type UserRepository } from '@users/domain/ports/user.port';
import type { Order } from '@users/domain/models/order.entity';

@Injectable()
export class GetOrdersByUserUseCase {
  constructor(
    @Inject(USERS_SERVICE_PORT)
    private readonly service: UserRepository,
  ) {}

  execute(userId: number): Order | Promise<Order> {
    return this.service.getOrdersByUser(userId);
  }
}
