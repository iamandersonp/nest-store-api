import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductsDto, UpdateProductsDto } from '../domain/dtos/products.dto';
import type { Product } from '../domain/models/product.entity';
import { ProductsService } from '../infrastructure/products.service';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

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
   * @return {*} Products[]
   * @memberof ProductsController
   */
  @Get()
  getAll(): Product[] {
    return this.service.findAll();
  }

  /**
   * Get one product
   *
   * @param {number} productId - Product id
   * @return {*} Product
   * @memberof ProductsController
   */
  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number): Product {
    return this.service.findOne(productId);
  }

  /**
   * Create a product
   *
   * @param {CreateProductsDto} payload - Product data
   * @return {*} {Product}
   * @memberof ProductsController
   */
  @Post()
  create(@Body() payload: CreateProductsDto): Product {
    return this.service.create(payload);
  }

  /**
   * Update a product
   *
   * @param {number} id - Product id to update
   * @param {UpdateProductsDto} payload - Product data
   * @return {*} {Product | null}
   * @memberof ProductsController
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductsDto,
  ): Product | null {
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
  delete(@Param('id', ParseIntPipe) id: number): void {
    return this.service.delete(id);
  }
}
