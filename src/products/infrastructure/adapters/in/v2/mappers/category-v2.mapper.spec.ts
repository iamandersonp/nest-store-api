import { CategoryV2Mapper } from './category-v2.mapper';
import { UpdateCategoryV2Dto } from '@products/infrastructure/adapters/in/v2/dtos/categories-v2.dto';
import { CreateCategoryCommand, UpdateCategoryCommand } from '@products/application/commands';
import { Category } from '@products/domain/models/category.entity';

describe('CategoryV2Mapper', () => {
  describe('fromCreateDto', () => {
    it('should map a full dto to a CreateCategoryCommand', () => {
      const dto = {
        name: 'A',
      };
      const model = CategoryV2Mapper.fromCreateDto(dto);
      expect(model).toBeInstanceOf(CreateCategoryCommand);
      expect(model).toEqual(new CreateCategoryCommand({ name: 'A' }));
    });
  });

  describe('fromUpdateDto', () => {
    it('should map a full update dto', () => {
      const dto: UpdateCategoryV2Dto = {
        name: 'X',
      };
      const result = CategoryV2Mapper.fromUpdateDto(dto);
      expect(result).toBeInstanceOf(UpdateCategoryCommand);
      expect(result).toEqual(new UpdateCategoryCommand({ name: 'X' }));
    });

    it('should return empty command if all fields undefined', () => {
      const dto = new UpdateCategoryV2Dto();
      const result = CategoryV2Mapper.fromUpdateDto(dto);
      expect(result).toBeInstanceOf(UpdateCategoryCommand);
      expect(result).toEqual(new UpdateCategoryCommand({}));
    });
  });

  describe('toDto', () => {
    it('should passthrough the category', () => {
      const category: Category = {
        id: 1,
        name: 'XX',
      };
      expect(CategoryV2Mapper.toDto(category)).toBe(category);
    });
  });
});
