/**
 * Interface for the 'Products' data
 *
 * @export
 * @interface Products
 */
export interface Products {
  /**
   * Product id
   *
   * @type {number}
   * @memberof Products
   */
  id: number;
  /**
   * Product name
   *
   * @type {string}
   * @memberof Products
   */
  name: string;
  /**
   * Product description
   *
   * @type {string}
   * @memberof Products
   */
  description: string;
  /**
   * Product price
   *
   * @type {number}
   * @memberof Products
   */
  price: number;
  /**
   * Product stock
   *
   * @type {number}
   * @memberof Products
   */
  stock: number;
  /**
   * Product image
   *
   * @type {string}
   * @memberof Products
   */
  image: string;
}
