import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Products } from '../models/products.interface';
import {
  CreateProductsDto,
  UpdateProductsDto,
} from '../dtos/products-dto.interface';

/**
 * Injectable to Handle the Products
 *
 * @export
 * @class ProductsService
 */
@Injectable()
export class ProductsService {
  /**
   * Counter to generate the id
   *
   * @private
   * @memberof ProductsService
   */
  private counterId = 1;

  /**
   * List of Products
   *
   * @private
   * @type {Products[]}
   * @memberof ProductsService
   */
  private products: Products[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 1000,
      stock: 100,
      image: '',
    },
  ];

  /**
   * Find all the products
   * @returns
   */
  findAll() {
    return this.products;
  }

  /**
   * Find one product by id
   *
   * @param {number} id
   * @return {*}
   * @memberof ProductsService
   */
  findOne(id: number) {
    const product = this.products.find(
      (item: Products) => item.id === id,
    );
    if (!product) {
      throw new NotFoundException(
        `Product ${id} not Found`,
      );
    }
    return product;
  }

  /**
   * Create a new product
   *
   * @param {CreateProductsDto} payload - Data to create a new product
   * @return {*} {Product}
   * @memberof ProductsService
   */
  create(payload: CreateProductsDto) {
    this.counterId++;
    const newProduct: Products = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  /**
   * Update a product
   *
   * @param {number} id - Id of the product to update
   * @param {UpdateProductsDto} payload - Data to update
   * @return {*} {Product}
   * @memberof ProductsService
   */
  update(id: number, payload: UpdateProductsDto) {
    const productId = this.findIndex(id);
    if (productId != 1) {
      const product = this.findOne(id);
      this.products[productId] = {
        ...product,
        ...payload,
      };
      return this.products[id];
    }
    return null;
  }

  /**
   * Delete a product
   *
   * @param {number} id - Id of the product to delete
   * @memberof ProductsService
   */
  delete(id: number) {
    const productId = this.findIndex(id);
    if (productId === -1) {
      throw new NotFoundException(
        `Product ${id} not Found`,
      );
    }
    this.products.slice(productId, 1);
  }

  /**
   * Find the index of the product
   *
   * @private
   * @param {number} id - Id of the product
   * @return {*} {number}
   * @memberof ProductsService
   */
  private findIndex(id: number) {
    return this.products.findIndex(
      (item) => item.id === id,
    );
  }
}
