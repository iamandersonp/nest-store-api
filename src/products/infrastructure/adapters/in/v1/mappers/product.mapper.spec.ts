import { ProductMapper } from './product.mapper';
import {
  CreateProductsDto,
  UpdateProductsDto,
} from '@products/infrastructure/adapters/in/v1/dtos/products.dto';
import { Product } from '@products/domain/models/product.entity';

describe('ProductMapper', () => {
  describe('fromCreateDto', () => {
    it('should map a full dto to a Product without id', () => {
      const dto: CreateProductsDto = {
        name: 'N',
        description: 'D',
        price: 123,
        stock: 10,
        image: 'http://img',
      };
      const model = ProductMapper.fromCreateDto(dto);
      expect(model).toEqual({
        name: 'N',
        description: 'D',
        price: 123,
        stock: 10,
        image: 'http://img',
      });
    });
  });

  describe('fromUpdateDto', () => {
    it('should map a full update dto', () => {
      const dto: UpdateProductsDto = {
        name: 'X',
        description: 'Y',
        price: 1,
        stock: 2,
        image: 'zz',
      };
      expect(ProductMapper.fromUpdateDto(dto)).toEqual(dto);
    });

    it('should skip fields set to undefined', () => {
      const dto = new UpdateProductsDto();
      Object.defineProperty(dto, 'description', { value: 'a', configurable: true });
      expect(ProductMapper.fromUpdateDto(dto)).toEqual({ description: 'a' });
    });

    it('should return empty object if all fields undefined', () => {
      const dto = new UpdateProductsDto();
      expect(ProductMapper.fromUpdateDto(dto)).toEqual({});
    });
  });

  describe('toDto', () => {
    it('should passthrough the product', () => {
      const prod: Product = {
        id: 1,
        name: 'X',
        description: 'Y',
        price: 2,
        stock: 1,
        image: 'img',
      };
      expect(ProductMapper.toDto(prod)).toBe(prod);
    });
  });
});
