import { Inject, Injectable } from '@nestjs/common';
import type { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import type { Category } from '@products/domain/models/category.entity';
import { CATEGORIES_PRISMA_PORT } from '@products/domain/ports/categories-prisma.port';
import { UpdateCategoryCommand } from '@products/application/commands';

@Injectable()
export class UpdateCategoryV2UseCase {
  constructor(
    @Inject(CATEGORIES_PRISMA_PORT)
    private readonly service: BaseCrudService<Category, any, UpdateCategoryCommand>,
  ) {}

  async execute(id: number, payload: UpdateCategoryCommand): Promise<Category> {
    return this.service.update(id, payload);
  }
}
