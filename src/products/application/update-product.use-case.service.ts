import { Inject, Injectable } from '@nestjs/common';
import type { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { Product } from '@products/domain/models/product.entity';
import { PRODUCTS_SERVICE_PORT } from '@products/domain/ports/product.port';
import {
  CreateProductsDto,
  UpdateProductsDto,
} from '@products/infrastructure/adapters/in/v1/dtos/products.dto';
import { UpdateProductCommand } from '@products/application/commands';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCTS_SERVICE_PORT)
    private readonly service: BaseCrudService<Product, CreateProductsDto, UpdateProductsDto>,
  ) {}

  execute(id: number, payload: UpdateProductCommand): Product | Promise<Product> {
    return this.service.update(id, payload);
  }
}
