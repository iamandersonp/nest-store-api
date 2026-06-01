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
  NotFoundException,
} from '@nestjs/common';
import { ProductNotFoundError } from '@products/domain/errors/product-not-found.error';

import { ProductUseCaseService } from '@products/application/product-use-case.service';
import type { Product } from '@products/domain/models/product.entity';
import {
  CreateProductsDto,
  UpdateProductsDto,
} from '@products/infrastructure/adapters/in/v1/dtos/products.dto';
import { ProductMapper } from '@products/infrastructure/adapters/in/v1/mappers/product.mapper';

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  /**
   * Creates an instance of ProductsController.
   * @param {BaseCrudService<Product, CreateProductsDto, UpdateProductsDto>} service
   * @memberof ProductsController
   */
  constructor(private readonly service: ProductUseCaseService) {}

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
  async getAll(): Promise<Product[]> {
    const products = await this.service.findAll();
    // Podrías mapear a un DTO de respuesta diferenciado aquí
    return Array.isArray(products) ? products.map((x) => ProductMapper.toDto(x)) : products;
  }

  /**
   * Get one product
   *
   * @param {number} productId - Product id
   * @return {*} Product | Promise<Product>
   * @memberof ProductsController
   */
  @Get(':productId')
  async getOne(@Param('productId', ParseIntPipe) productId: number): Promise<Product> {
    try {
      const product = await this.service.findOne(productId);
      return ProductMapper.toDto(product);
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  /**
   * Create a product
   *
   * @param {CreateProductsDto} payload - Product data
   * @return {*} {Product | Promise<Product>}
   * @memberof ProductsController
   */
  @Post()
  async create(@Body() payload: CreateProductsDto): Promise<Product> {
    // Convertir DTO a modelo antes de pasar a la capa de aplicación
    const modelPayload = ProductMapper.fromCreateDto(payload);
    const created = await this.service.create(modelPayload);
    return ProductMapper.toDto(created);
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
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductsDto,
  ): Promise<Product> {
    try {
      // Convertir DTO a modelo parcial
      const modelPayload = ProductMapper.fromUpdateDto(payload);
      const updated = await this.service.update(id, modelPayload);
      return ProductMapper.toDto(updated);
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  /**
   * Delete a product
   *
   * @param {number} id - Product id to delete
   * @memberof ProductsController
   */
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.service.delete(id);
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
