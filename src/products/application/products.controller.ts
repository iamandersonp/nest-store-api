import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import type { BasseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { CreateProductsDto, UpdateProductsDto } from '@products/domain/dtos/products.dto';
import type { Product } from '@products/domain/models/product.entity';
import { PRODUCTS_SERVICE_PORT } from '@products/domain/ports/product.port';

@Controller('products')
export class ProductsController {
  /**
   * Creates an instance of ProductsController.
   * @param {BasseCrudService<Product, CreateProductsDto, UpdateProductsDto>} service
   * @memberof ProductsController
   */
  constructor(
    @Inject(PRODUCTS_SERVICE_PORT)
    private readonly service: BasseCrudService<Product, CreateProductsDto, UpdateProductsDto>,
  ) {}

  // @Get()
  // getProducts(
  //   @Query('limit') limit = 100,
  //   @Query('offset') offset = 0,
  //   @Query('brand') brand: string,
  // ) {
  //   return this.service.findAll();
  // }

  /**
   * Get all products
   *
   * @return {*} Products[] | Promise<Product[]>
   * @memberof ProductsController
   */
  @Get()
  getAll(): Product[] | Promise<Product[]> {
    return this.service.findAll();
  }

  /**
   * Get one product
   *
   * @param {number} productId - Product id
   * @return {*} Product | Promise<Product>
   * @memberof ProductsController
   */
  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number): Product | Promise<Product> {
    return this.service.findOne(productId);
  }

  /**
   * Create a product
   *
   * @param {CreateProductsDto} payload - Product data
   * @return {*} {Product | Promise<Product>}
   * @memberof ProductsController
   */
  @Post()
  create(@Body() payload: CreateProductsDto): Product | Promise<Product> {
    return this.service.create(payload);
  }

  /**
   * Update a product
   *
   * @param {number} id - Product id to update
   * @param {UpdateProductsDto} payload - Product data
   * @return {*} {Product | Promise<Product>}
   * @memberof ProductsController
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductsDto,
  ): Product | Promise<Product> {
    return this.service.update(id, payload);
  }

  /**
   * Delete a product
   *
   * @param {number} id - Product id to delete
   * @memberof ProductsController
   */
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): void | Promise<void> {
    return this.service.delete(id);
  }
}
