import { Category } from '@products/domain/models/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDtoDto,
} from '@products/infrastructure/adapters/in/v1/dtos/categories.dto';
import { CreateCategoryCommand, UpdateCategoryCommand } from '@products/application/commands';

/**
 * Mapper de Category <-> DTOs HTTP
 */
export class CategoryMapper {
  static fromCreateDto(dto: CreateCategoryDto): CreateCategoryCommand {
    return new CreateCategoryCommand({ name: dto.name });
  }
  static fromUpdateDto(dto: UpdateCategoryDtoDto): UpdateCategoryCommand {
    return new UpdateCategoryCommand({
      ...(dto.name !== undefined && { name: dto.name }),
    });
  }
  static toDto(model: Category): Category {
    return model;
  }
}
