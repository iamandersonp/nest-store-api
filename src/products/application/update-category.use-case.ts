import { Inject, Injectable } from '@nestjs/common';
import type { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { Category } from '@products/domain/models/category.entity';
import { CATEGORIES_SERVICE_PORT } from '@products/domain/ports/category.port';
import {
  CreateCategoryDto,
  UpdateCategoryDtoDto,
} from '@products/infrastructure/adapters/in/v1/dtos/categories.dto';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject(CATEGORIES_SERVICE_PORT)
    private readonly service: BaseCrudService<Category, CreateCategoryDto, UpdateCategoryDtoDto>,
  ) {}

  execute(id: number, payload: UpdateCategoryDtoDto): Category | Promise<Category> {
    return this.service.update(id, payload);
  }
}
