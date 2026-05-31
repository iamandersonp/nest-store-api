import { Category } from '@products/domain/models/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDtoDto,
} from '@products/infrastructure/adapters/in/v1/dtos/categories.dto';

/**
 * Mapper de Category <-> DTOs HTTP
 */
export class CategoryMapper {
  static fromCreateDto(dto: CreateCategoryDto): Omit<Category, 'id'> {
    // Solo toma name según definición actual del modelo
    const { name } = dto;
    return { name };
  }
  static fromUpdateDto(dto: UpdateCategoryDtoDto): Partial<Category> {
    const out: Partial<Category> = {};
    if (dto.name !== undefined) out.name = dto.name;
    return out;
  }
  static toDto(model: Category): Category {
    return model;
  }
}
