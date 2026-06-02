import { Product } from '@products/domain/models/product.entity';
import {
  CreateProductV2Dto,
  UpdateProductV2Dto,
} from '@products/infrastructure/adapters/in/v2/dtos/products-v2.dto';
import { CreateProductCommand, UpdateProductCommand } from '@products/application/commands';

/**
 * Mapper de Product <-> DTOs HTTP v2
 * @memberof products/infrastructure/adapters/in/v2/mappers
 */
export class ProductV2Mapper {
  /**
   * Converts CreateProductV2Dto to CreateProductCommand
   */
  static fromCreateDto(dto: CreateProductV2Dto): CreateProductCommand {
    return new CreateProductCommand({
      ...dto,
      brandId: 0,
      categoryId: 0,
    });
  }

  /**
   * Converts UpdateProductV2Dto to UpdateProductCommand
   */
  static fromUpdateDto(dto: UpdateProductV2Dto): UpdateProductCommand {
    return new UpdateProductCommand({
      ...(dto.name !== undefined && { name: dto.name }),
      ...(dto.description !== undefined && { description: dto.description }),
      ...(dto.price !== undefined && { price: dto.price }),
      ...(dto.stock !== undefined && { stock: dto.stock }),
      ...(dto.image !== undefined && { image: dto.image }),
    });
  }

  /**
   * Converts Product to output plain object
   */
  static toDto(model: Product): Product {
    return model;
  }
}
