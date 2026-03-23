import { Products } from '../../products/models/products.entity';
import { Users } from './users.entity';

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
