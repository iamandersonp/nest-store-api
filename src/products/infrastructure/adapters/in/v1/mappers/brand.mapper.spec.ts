import { BrandMapper } from './brand.mapper';
import { UpdateBrandDto } from '@products/infrastructure/adapters/in/v1/dtos/brands.dto';
import { Brand } from '@products/domain/models/brand.entity';

describe('BrandMapper', () => {
  describe('fromCreateDto', () => {
    it('should map a full dto to a Brand without id', () => {
      const dto = {
        name: 'N',
        image: 'http://img',
      };
      const model = BrandMapper.fromCreateDto(dto);
      expect(model).toEqual({
        name: 'N',
        image: 'http://img',
      });
    });
  });

  describe('fromUpdateDto', () => {
    it('should map a full update dto', () => {
      const dto: UpdateBrandDto = {
        name: 'X',
        image: 'img',
      };
      expect(BrandMapper.fromUpdateDto(dto)).toEqual(dto);
    });

    it('should skip fields set to undefined', () => {
      const dto = new UpdateBrandDto();
      Object.defineProperty(dto, 'image', { value: 'x', configurable: true });
      expect(BrandMapper.fromUpdateDto(dto)).toEqual({ image: 'x' });
    });

    it('should return empty object if all fields undefined', () => {
      const dto = new UpdateBrandDto();
      expect(BrandMapper.fromUpdateDto(dto)).toEqual({});
    });
  });

  describe('toDto', () => {
    it('should passthrough the brand', () => {
      const brand: Brand = {
        id: 1,
        name: 'X',
        image: 'img',
      };
      expect(BrandMapper.toDto(brand)).toBe(brand);
    });
  });
});
