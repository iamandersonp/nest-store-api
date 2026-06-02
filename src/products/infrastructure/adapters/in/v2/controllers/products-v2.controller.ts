import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductNotFoundError } from '@products/domain/errors/product-not-found.error';

import { CreateProductV2UseCase } from '@products/application/create-product-v2.use-case.service';
import { GetAllProductsV2UseCase } from '@products/application/get-all-products-v2.use-case.service';
import { GetProductV2UseCase } from '@products/application/get-product-v2.use-case.service';
import { UpdateProductV2UseCase } from '@products/application/update-product-v2.use-case.service';
import { DeleteProductV2UseCase } from '@products/application/delete-product-v2.use-case.service';
import type { Product } from '@products/domain/models/product.entity';
import {
  CreateProductV2Dto,
  UpdateProductV2Dto,
} from '@products/infrastructure/adapters/in/v2/dtos/products-v2.dto';
import { ProductV2Mapper } from '@products/infrastructure/adapters/in/v2/mappers/product-v2.mapper';

@Controller({
  path: 'products',
  version: '2',
})
export class ProductsV2Controller {
  constructor(
    private readonly createProductV2UseCase: CreateProductV2UseCase,
    private readonly getAllProductsV2UseCase: GetAllProductsV2UseCase,
    private readonly getProductV2UseCase: GetProductV2UseCase,
    private readonly updateProductV2UseCase: UpdateProductV2UseCase,
    private readonly deleteProductV2UseCase: DeleteProductV2UseCase,
  ) {}

  @Get()
  async getAll(): Promise<Product[]> {
    const products = await this.getAllProductsV2UseCase.execute();
    return products.map((x) => ProductV2Mapper.toDto(x));
  }

  @Get(':productId')
  async getOne(@Param('productId', ParseIntPipe) productId: number): Promise<Product> {
    try {
      const product = await this.getProductV2UseCase.execute(productId);
      return ProductV2Mapper.toDto(product);
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post()
  async create(@Body() payload: CreateProductV2Dto): Promise<Product> {
    const modelPayload = ProductV2Mapper.fromCreateDto(payload);
    const created = await this.createProductV2UseCase.execute(modelPayload);
    return ProductV2Mapper.toDto(created);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductV2Dto,
  ): Promise<Product> {
    try {
      const modelPayload = ProductV2Mapper.fromUpdateDto(payload);
      const updated = await this.updateProductV2UseCase.execute(id, modelPayload);
      return ProductV2Mapper.toDto(updated);
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.deleteProductV2UseCase.execute(id);
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
