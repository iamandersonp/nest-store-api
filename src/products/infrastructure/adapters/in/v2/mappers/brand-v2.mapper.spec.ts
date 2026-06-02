import { BrandV2Mapper } from './brand-v2.mapper';
import { UpdateBrandV2Dto } from '@products/infrastructure/adapters/in/v2/dtos/brands-v2.dto';
import { CreateBrandCommand, UpdateBrandCommand } from '@products/application/commands';
import { Brand } from '@products/domain/models/brand.entity';

describe('BrandV2Mapper', () => {
  describe('fromCreateDto', () => {
    it('should map a full dto to a CreateBrandCommand', () => {
      const dto = {
        name: 'N',
        image: 'http://img',
      };
      const model = BrandV2Mapper.fromCreateDto(dto);
      expect(model).toBeInstanceOf(CreateBrandCommand);
      expect(model).toEqual(new CreateBrandCommand({ name: 'N', image: 'http://img' }));
    });
  });

  describe('fromUpdateDto', () => {
    it('should map a full update dto', () => {
      const dto: UpdateBrandV2Dto = {
        name: 'X',
        image: 'img',
      };
      const result = BrandV2Mapper.fromUpdateDto(dto);
      expect(result).toBeInstanceOf(UpdateBrandCommand);
      expect(result).toEqual(new UpdateBrandCommand({ name: 'X', image: 'img' }));
    });

    it('should skip fields set to undefined', () => {
      const dto = new UpdateBrandV2Dto();
      Object.defineProperty(dto, 'image', { value: 'x', configurable: true });
      const result = BrandV2Mapper.fromUpdateDto(dto);
      expect(result).toBeInstanceOf(UpdateBrandCommand);
      expect(result).toEqual(new UpdateBrandCommand({ image: 'x' }));
    });

    it('should return empty command if all fields undefined', () => {
      const dto = new UpdateBrandV2Dto();
      const result = BrandV2Mapper.fromUpdateDto(dto);
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
      expect(BrandV2Mapper.toDto(brand)).toBe(brand);
    });
  });
});
