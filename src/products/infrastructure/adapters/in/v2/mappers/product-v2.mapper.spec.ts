import { ProductV2Mapper } from './product-v2.mapper';
import {
  CreateProductV2Dto,
  UpdateProductV2Dto,
} from '@products/infrastructure/adapters/in/v2/dtos/products-v2.dto';
import { CreateProductCommand, UpdateProductCommand } from '@products/application/commands';
import { Product } from '@products/domain/models/product.entity';

describe('ProductV2Mapper', () => {
  describe('fromCreateDto', () => {
    it('should map a full dto to a CreateProductCommand', () => {
      const dto: CreateProductV2Dto = {
        name: 'N',
        description: 'D',
        price: 123,
        stock: 10,
        image: 'http://img',
      };
      const model = ProductV2Mapper.fromCreateDto(dto);
      expect(model).toBeInstanceOf(CreateProductCommand);
      expect(model).toEqual(
        new CreateProductCommand({
          name: 'N',
          description: 'D',
          price: 123,
          stock: 10,
          image: 'http://img',
          brandId: 0,
          categoryId: 0,
        }),
      );
    });
  });

  describe('fromUpdateDto', () => {
    it('should map a full update dto', () => {
      const dto: UpdateProductV2Dto = {
        name: 'X',
        description: 'Y',
        price: 1,
        stock: 2,
        image: 'zz',
      };
      const result = ProductV2Mapper.fromUpdateDto(dto);
      expect(result).toBeInstanceOf(UpdateProductCommand);
      expect(result).toEqual(new UpdateProductCommand({ ...dto }));
    });

    it('should skip fields set to undefined', () => {
      const dto = new UpdateProductV2Dto();
      Object.defineProperty(dto, 'description', { value: 'a', configurable: true });
      const result = ProductV2Mapper.fromUpdateDto(dto);
      expect(result).toBeInstanceOf(UpdateProductCommand);
      expect(result).toEqual(new UpdateProductCommand({ description: 'a' }));
    });

    it('should return empty command if all fields undefined', () => {
      const dto = new UpdateProductV2Dto();
      const result = ProductV2Mapper.fromUpdateDto(dto);
      expect(result).toBeInstanceOf(UpdateProductCommand);
      expect(result).toEqual(new UpdateProductCommand({}));
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
      expect(ProductV2Mapper.toDto(prod)).toBe(prod);
    });
  });
});
