import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import {
  CreateProductsDto,
  UpdateProductsDto,
} from '../dtos/products-dto.interface';

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
   * @return {*} Product[]
   * @memberof ProductsController
   */
  @Get()
  getAll() {
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
  getOne(
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.service.findOne(productId);
  }

  /**
   * Create a product
   *
   * @param {CreateProductsDto} payload - Product data
   * @return {*} Product
   * @memberof ProductsController
   */
  @Post()
  create(@Body() payload: CreateProductsDto) {
    return this.service.create(payload);
  }

  /**
   * Update a product
   *
   * @param {number} id - Product id to update
   * @param {UpdateProductsDto} payload - Product data
   * @return {*} Product
   * @memberof ProductsController
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductsDto,
  ) {
    return this.service.update(id, payload);
  }

  /**
   * Delete a product
   *
   * @param {number} id - Product id to delete
   * @return {*} Product
   * @memberof ProductsController
   */
  @Delete()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
