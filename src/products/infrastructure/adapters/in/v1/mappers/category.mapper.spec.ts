import { CategoryMapper } from './category.mapper';
import { UpdateCategoryDtoDto } from '@products/infrastructure/adapters/in/v1/dtos/categories.dto';
import { CreateCategoryCommand, UpdateCategoryCommand } from '@products/application/commands';
import { Category } from '@products/domain/models/category.entity';

describe('CategoryMapper', () => {
  describe('fromCreateDto', () => {
    it('should map a full dto to a CreateCategoryCommand', () => {
      const dto = {
        name: 'A',
      };
      const model = CategoryMapper.fromCreateDto(dto);
      expect(model).toBeInstanceOf(CreateCategoryCommand);
      expect(model).toEqual(new CreateCategoryCommand({ name: 'A' }));
    });
  });

  describe('fromUpdateDto', () => {
    it('should map a full update dto', () => {
      const dto: UpdateCategoryDtoDto = {
        name: 'X',
      };
      const result = CategoryMapper.fromUpdateDto(dto);
      expect(result).toBeInstanceOf(UpdateCategoryCommand);
      expect(result).toEqual(new UpdateCategoryCommand({ name: 'X' }));
    });

    it('should return empty command if all fields undefined', () => {
      const dto = new UpdateCategoryDtoDto();
      const result = CategoryMapper.fromUpdateDto(dto);
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
      expect(CategoryMapper.toDto(category)).toBe(category);
    });
  });
});
