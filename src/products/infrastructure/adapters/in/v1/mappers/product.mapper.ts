import { Product } from '@products/domain/models/product.entity';
import {
  CreateProductsDto,
  UpdateProductsDto,
} from '@products/infrastructure/adapters/in/v1/dtos/products.dto';
import { CreateProductCommand, UpdateProductCommand } from '@products/application/commands';

/**
 * Mapper de Product <-> DTOs HTTP
 * @memberof products/infrastructure/adapters/in/v1/mappers
 */
export class ProductMapper {
  /**
   * Convierte CreateProductsDto a CreateProductCommand
   */
  static fromCreateDto(dto: CreateProductsDto): CreateProductCommand {
    return new CreateProductCommand({
      ...dto,
      brandId: 0,
      categoryId: 0,
    });
  }

  /**
   * Convierte UpdateProductsDto a UpdateProductCommand
   */
  static fromUpdateDto(dto: UpdateProductsDto): UpdateProductCommand {
    return new UpdateProductCommand({
      ...(dto.name !== undefined && { name: dto.name }),
      ...(dto.description !== undefined && { description: dto.description }),
      ...(dto.price !== undefined && { price: dto.price }),
      ...(dto.stock !== undefined && { stock: dto.stock }),
      ...(dto.image !== undefined && { image: dto.image }),
    });
  }

  /**
   * Convierte Product a output plano (puede ser extendido si vas a usar DTO de response)
   */
  static toDto(model: Product): Product {
    // Actualmente devolvés Product tal cual, pero aquí se harían los maps/omit extra
    return model;
  }
}
