import { Category } from '@products/domain/models/category.entity';
import {
  CreateCategoryV2Dto,
  UpdateCategoryV2Dto,
} from '@products/infrastructure/adapters/in/v2/dtos/categories-v2.dto';
import { CreateCategoryCommand, UpdateCategoryCommand } from '@products/application/commands';

/**
 * Mapper de Category <-> DTOs HTTP v2
 */
export class CategoryV2Mapper {
  static fromCreateDto(dto: CreateCategoryV2Dto): CreateCategoryCommand {
    return new CreateCategoryCommand({ name: dto.name });
  }

  static fromUpdateDto(dto: UpdateCategoryV2Dto): UpdateCategoryCommand {
    return new UpdateCategoryCommand({
      ...(dto.name !== undefined && { name: dto.name }),
    });
  }

  static toDto(model: Category): Category {
    return model;
  }
}
