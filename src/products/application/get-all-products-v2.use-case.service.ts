import { Inject, Injectable } from '@nestjs/common';
import type { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import type { Product } from '@products/domain/models/product.entity';
import { PRODUCTS_PRISMA_PORT } from '@products/domain/ports/products-prisma.port';

@Injectable()
export class GetAllProductsV2UseCase {
  constructor(
    @Inject(PRODUCTS_PRISMA_PORT)
    private readonly service: BaseCrudService<Product, any, any>,
  ) {}

  async execute(): Promise<Product[]> {
    return this.service.findAll();
  }
}
