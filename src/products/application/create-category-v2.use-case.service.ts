import { Inject, Injectable } from '@nestjs/common';
import type { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import type { Category } from '@products/domain/models/category.entity';
import { CATEGORIES_PRISMA_PORT } from '@products/domain/ports/categories-prisma.port';
import { CreateCategoryCommand } from '@products/application/commands';

@Injectable()
export class CreateCategoryV2UseCase {
  constructor(
    @Inject(CATEGORIES_PRISMA_PORT)
    private readonly service: BaseCrudService<Category, CreateCategoryCommand, any>,
  ) {}

  async execute(payload: CreateCategoryCommand): Promise<Category> {
    return this.service.create(payload);
  }
}
