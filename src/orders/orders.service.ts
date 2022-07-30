import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateOrdersDto,
  UpdateOrdersDto,
} from './orders-dto.interface';
import { Orders } from './orders.interface';

@Injectable()
export class OrdersService {
  private counterId = 1;
  private orders: Orders[] = [
    {
      id: 1,
      customerId: 1,
      date: '2022-07-01',
      total: 1000,
    },
  ];

  /**
   * Return all Orders
   *
   * @return {Orders[]}
   * @memberof OrdersService
   */
  findAll() {
    return this.orders;
  }

  /**
   * Return a order specified by id
   *
   * @param {number} id -  The Order id to return
   * @return {Orders} the entity Orders corresponding
   * @memberof OrdersService
   */
  findOne(id: number) {
    const order = this.orders.find(
      (item: Orders) => item.id === id,
    );
    if (!order) {
      throw new NotFoundException(`Order ${id} not Found`);
    }
    return order;
  }

  /**
   * Create a new Order with the specified payload data
   *
   * @param {CreateOrdersDto} payload - The Paypload with the order info
   * @return {Order} - The new Created order
   * @memberof OrdersService
   */
  create(payload: CreateOrdersDto) {
    this.counterId++;
    const newOrder: Orders = {
      id: this.counterId,
      ...payload,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  /**
   * Update a order specified by id
   *
   * @param {number} id - The id of the order to update
   * @param {UpdateOrdersDto} payload - The payload data with the new information
   * @return {Orders} - The updated order
   * @memberof OrdersService
   */
  update(id: number, payload: UpdateOrdersDto) {
    const orderId = this.findIndex(id);
    if (orderId != 1) {
      const order = this.findOne(id);
      this.orders[orderId] = {
        ...order,
        ...payload,
      };
      return this.orders[id];
    }
    return null;
  }

  /**
   * Delete an Order specified by id
   *
   * @param {number} id - the id of the order to delete
   * @memberof OrdersService
   */
  delete(id: number) {
    const orderId = this.findIndex(id);
    if (orderId === -1) {
      throw new NotFoundException(`Order ${id} not Found`);
    }
    this.orders.slice(orderId, 1);
  }

  /**
   * Obtain an Order from by a given id
   *
   * @private
   * @param {number} id - The id to find
   * @return {Orders} - the order found
   * @memberof OrdersService
   */
  private findIndex(id: number) {
    return this.orders.findIndex((item) => item.id === id);
  }
}
