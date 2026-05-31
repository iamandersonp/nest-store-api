import { Product } from '@products/domain/models/product.entity';
import {
  CreateProductsDto,
  UpdateProductsDto,
} from '@products/infrastructure/adapters/in/v1/dtos/products.dto';

/**
 * Mapper de Product <-> DTOs HTTP
 * @memberof products/infrastructure/adapters/in/v1/mappers
 */
export class ProductMapper {
  /**
   * Convierte CreateProductsDto a Product (sin id)
   */
  static fromCreateDto(dto: CreateProductsDto): Omit<Product, 'id'> {
    // El id se asigna en infraestructura, no desde el DTO
    const { name, description, price, stock, image } = dto;
    return { name, description, price, stock, image };
  }

  /**
   * Convierte UpdateProductsDto a Partial<Product>
   */
  static fromUpdateDto(dto: UpdateProductsDto): Partial<Product> {
    const out: Partial<Product> = {};
    if (dto.name !== undefined) out.name = dto.name;
    if (dto.description !== undefined) out.description = dto.description;
    if (dto.price !== undefined) out.price = dto.price;
    if (dto.stock !== undefined) out.stock = dto.stock;
    if (dto.image !== undefined) out.image = dto.image;
    return out;
  }

  /**
   * Convierte Product a output plano (puede ser extendido si vas a usar DTO de response)
   */
  static toDto(model: Product): Product {
    // Actualmente devolvés Product tal cual, pero aquí se harían los maps/omit extra
    return model;
  }
}
