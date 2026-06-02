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

import { CreateProductUseCase } from '@products/application/create-product.use-case.service';
import { FindAllProductsUseCase } from '@products/application/find-all-products.use-case.service';
import { FindOneProductUseCase } from '@products/application/find-one-product.use-case.service';
import { UpdateProductUseCase } from '@products/application/update-product.use-case.service';
import { DeleteProductUseCase } from '@products/application/delete-product.use-case.service';
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
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly findOneProductUseCase: FindOneProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Get()
  async getAll(): Promise<Product[]> {
    const products = await this.findAllProductsUseCase.execute();
    return Array.isArray(products) ? products.map((x) => ProductMapper.toDto(x)) : products;
  }

  @Get(':productId')
  async getOne(@Param('productId', ParseIntPipe) productId: number): Promise<Product> {
    try {
      const product = await this.findOneProductUseCase.execute(productId);
      return ProductMapper.toDto(product);
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post()
  async create(@Body() payload: CreateProductsDto): Promise<Product> {
    const modelPayload = ProductMapper.fromCreateDto(payload);
    const created = await this.createProductUseCase.execute(modelPayload);
    return ProductMapper.toDto(created);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductsDto,
  ): Promise<Product> {
    try {
      const modelPayload = ProductMapper.fromUpdateDto(payload);
      const updated = await this.updateProductUseCase.execute(id, modelPayload);
      return ProductMapper.toDto(updated);
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.deleteProductUseCase.execute(id);
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
