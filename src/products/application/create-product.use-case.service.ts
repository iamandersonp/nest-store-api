import { Inject, Injectable } from '@nestjs/common';
import type { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { Product } from '@products/domain/models/product.entity';
import { PRODUCTS_SERVICE_PORT } from '@products/domain/ports/product.port';
import { CreateProductsDto } from '@products/infrastructure/adapters/in/v1/dtos/products.dto';
import { CreateProductCommand } from '@products/application/commands';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCTS_SERVICE_PORT)
    private readonly service: BaseCrudService<Product, CreateProductsDto, any>,
  ) {}

  execute(payload: CreateProductCommand): Product | Promise<Product> {
    return this.service.create(payload);
  }
}
