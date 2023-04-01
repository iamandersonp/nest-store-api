import { Products } from '../../products/models/products.interface';
import { Users } from './users.interface';

/**
 * Orders Interface
 *
 * @export
 * @interface Orders
 */
export interface Orders {
  id: number;
  date: Date;
  user: Users;
  products: Products[];
  total: number;
}
