import { BrandMapper } from './brand.mapper';
import { UpdateBrandDto } from '@products/infrastructure/adapters/in/v1/dtos/brands.dto';
import { CreateBrandCommand, UpdateBrandCommand } from '@products/application/commands';
import { Brand } from '@products/domain/models/brand.entity';

describe('BrandMapper', () => {
  describe('fromCreateDto', () => {
    it('should map a full dto to a CreateBrandCommand', () => {
      const dto = {
        name: 'N',
        image: 'http://img',
      };
      const model = BrandMapper.fromCreateDto(dto);
      expect(model).toBeInstanceOf(CreateBrandCommand);
      expect(model).toEqual(new CreateBrandCommand({ name: 'N', image: 'http://img' }));
    });
  });

  describe('fromUpdateDto', () => {
    it('should map a full update dto', () => {
      const dto: UpdateBrandDto = {
        name: 'X',
        image: 'img',
      };
      const result = BrandMapper.fromUpdateDto(dto);
      expect(result).toBeInstanceOf(UpdateBrandCommand);
      expect(result).toEqual(new UpdateBrandCommand({ name: 'X', image: 'img' }));
    });

    it('should skip fields set to undefined', () => {
      const dto = new UpdateBrandDto();
      Object.defineProperty(dto, 'image', { value: 'x', configurable: true });
      const result = BrandMapper.fromUpdateDto(dto);
      expect(result).toBeInstanceOf(UpdateBrandCommand);
      expect(result).toEqual(new UpdateBrandCommand({ image: 'x' }));
    });

    it('should return empty command if all fields undefined', () => {
      const dto = new UpdateBrandDto();
      const result = BrandMapper.fromUpdateDto(dto);
      expect(result).toBeInstanceOf(UpdateBrandCommand);
      expect(result).toEqual(new UpdateBrandCommand({}));
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
