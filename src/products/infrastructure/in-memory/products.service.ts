import { BasseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductsDto, UpdateProductsDto } from '../../domain/dtos/products.dto';
import type { Product } from '../../domain/models/product.entity';

/**
 * Injectable to Handle the Products
 *
 * @export
 * @class ProductsService
 */
@Injectable()
export class ProductsService implements BasseCrudService<
  Product,
  CreateProductsDto,
  UpdateProductsDto
> {
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
   * @type {Product[]}
   * @memberof ProductsService
   */
  private products: Product[] = [
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
   *
   * @returns {*} {Product[]}
   */
  findAll(): Product[] {
    return this.products;
  }

  /**
   * Find one product by id
   *
   * @param {number} id
   * @return {*} {Product}
   * @memberof ProductsService
   */
  findOne(id: number): Product {
    const product = this.products.find((item: Product) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not Found`);
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
  create(payload: CreateProductsDto): Product {
    this.counterId++;
    const newProduct: Product = {
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
  update(id: number, payload: UpdateProductsDto): Product {
    const idx = this.findIndex(id);
    if (idx === -1) {
      throw new NotFoundException(`Product ${id} not Found`);
    }

    const product = this.findOne(id);
    this.products[idx] = {
      ...product,
      ...payload,
    };
    return this.products[id];
  }

  /**
   * Delete a product
   *
   * @param {number} id - Id of the product to delete
   * @memberof ProductsService
   */
  delete(id: number): void {
    const idx = this.findIndex(id);
    if (idx === -1) {
      throw new NotFoundException(`Product ${id} not Found`);
    }
    this.products.slice(idx, 1);
  }

  /**
   * Find the index of the product
   *
   * @private
   * @param {number} id - Id of the product
   * @return {*} {number}
   * @memberof ProductsService
   */
  private findIndex(id: number): number {
    return this.products.findIndex((item) => item.id === id);
  }
}
