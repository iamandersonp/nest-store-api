import { Inject, Injectable } from '@nestjs/common';
import type { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import type { Product } from '@products/domain/models/product.entity';
import { PRODUCTS_PRISMA_PORT } from '@products/domain/ports/products-prisma.port';
import { CreateProductCommand } from '@products/application/commands';

@Injectable()
export class CreateProductV2UseCase {
  constructor(
    @Inject(PRODUCTS_PRISMA_PORT)
    private readonly service: BaseCrudService<Product, CreateProductCommand, any>,
  ) {}

  async execute(payload: CreateProductCommand): Promise<Product> {
    return this.service.create(payload);
  }
}
