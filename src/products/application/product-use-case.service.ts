import { Inject, Injectable } from '@nestjs/common';

import type { BasseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { Product } from '@products/domain/models/product.entity';
import { PRODUCTS_SERVICE_PORT } from '@products/domain/ports/product.port';
import {
  CreateProductsDto,
  UpdateProductsDto,
} from '@products/infrastructure/adapters/in/v1/dtos/products.dto';

@Injectable()
export class ProductUseCaseService {
  /**
   * Creates an instance of ProductUseCaseService.
   * @param {BasseCrudService<Product, CreateProductsDto, UpdateProductsDto>} service
   * @memberof ProductUseCaseService
   */
  constructor(
    @Inject(PRODUCTS_SERVICE_PORT)
    private readonly service: BasseCrudService<Product, CreateProductsDto, UpdateProductsDto>,
  ) {}

  /**
   * Get All Produces
   *
   * @return {*}  {(Product[] | Promise<Product[]>)}
   * @memberof ProductUseCaseService
   */
  findAll(): Product[] | Promise<Product[]> {
    return this.service.findAll();
  }

  /**
   * Get a product by its id
   *
   * @param {number} productId
   * @return {*}  {(Product | Promise<Product>)}
   * @memberof ProductUseCaseService
   */
  findOne(productId: number): Product | Promise<Product> {
    return this.service.findOne(productId);
  }

  /**
   * Create a product
   *
   * @param {CreateProductsDto} payload
   * @return {*}  {(Product | Promise<Product>)}
   * @memberof ProductUseCaseService
   */
  create(payload: CreateProductsDto): Product | Promise<Product> {
    return this.service.create(payload);
  }

  /**
   * Update a product by its id
   *
   * @param {number} id
   * @param {UpdateProductsDto} payload
   * @return {*}  {(Product | Promise<Product>)}
   * @memberof ProductUseCaseService
   */
  update(id: number, payload: UpdateProductsDto): Product | Promise<Product> {
    return this.service.update(id, payload);
  }

  /**
   * Delete a product by its id
   *
   * @param {number} id
   * @return {*}  {(void | Promise<void>)}
   * @memberof ProductUseCaseService
   */
  delete(id: number): void | Promise<void> {
    return this.service.delete(id);
  }
}
