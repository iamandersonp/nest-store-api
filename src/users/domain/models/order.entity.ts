import { Product } from '../../../products/domain/models/product.entity';
import { User } from './user.entity';

/**
 * Orders Interface
 *
 * @export
 * @interface Order
 */
export interface Order {
  id: number;
  date: Date;
  user: User;
  products: Product[];
  total: number;
}
