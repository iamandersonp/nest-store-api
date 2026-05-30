import { Controller } from '@nestjs/common';
import { CreateOrdersDto } from '../dtos/orders.dto';

@Controller({
  path: 'orders',
  version: '1',
})
export class OrdersController {
  /**
   * Dummy property to reference CreateOrdersDto and ensure validation metadata compilation
   *
   * @private
   * @type {CreateOrdersDto}
   * @memberof OrdersController
   */
  private _dummy?: CreateOrdersDto;
}
