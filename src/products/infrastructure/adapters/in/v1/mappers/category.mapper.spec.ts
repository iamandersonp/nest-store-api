import { CategoryMapper } from './category.mapper';
import { UpdateCategoryDtoDto } from '@products/infrastructure/adapters/in/v1/dtos/categories.dto';
import { Category } from '@products/domain/models/category.entity';

describe('CategoryMapper', () => {
  describe('fromCreateDto', () => {
    it('should map a full dto to a Category without id', () => {
      const dto = {
        name: 'A',
      };
      const model = CategoryMapper.fromCreateDto(dto);
      expect(model).toEqual({ name: 'A' });
    });
  });

  describe('fromUpdateDto', () => {
    it('should map a full update dto', () => {
      const dto: UpdateCategoryDtoDto = {
        name: 'X',
      };
      expect(CategoryMapper.fromUpdateDto(dto)).toEqual(dto);
    });

    it('should skip fields set to undefined', () => {
      const dto = new UpdateCategoryDtoDto();
      // campo description no existe, así que simplemente vacío
      expect(CategoryMapper.fromUpdateDto(dto)).toEqual({});
    });

    it('should return empty object if all fields undefined', () => {
      const dto = new UpdateCategoryDtoDto();
      expect(CategoryMapper.fromUpdateDto(dto)).toEqual({});
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
