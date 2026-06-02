import { Inject, Injectable } from '@nestjs/common';
import type { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import type { Category } from '@products/domain/models/category.entity';
import { CATEGORIES_PRISMA_PORT } from '@products/domain/ports/categories-prisma.port';

@Injectable()
export class GetCategoryV2UseCase {
  constructor(
    @Inject(CATEGORIES_PRISMA_PORT)
    private readonly service: BaseCrudService<Category, any, any>,
  ) {}

  async execute(id: number): Promise<Category> {
    return this.service.findOne(id);
  }
}
