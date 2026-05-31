import { Brand } from '@products/domain/models/brand.entity';
import {
  CreateBrandDto,
  UpdateBrandDto,
} from '@products/infrastructure/adapters/in/v1/dtos/brands.dto';

/**
 * Mapper de Brand <-> DTOs HTTP
 */
export class BrandMapper {
  static fromCreateDto(dto: CreateBrandDto): Omit<Brand, 'id'> {
    // id es generado en infraestructura si corresponde
    const { name, image } = dto;
    return { name, image };
  }
  static fromUpdateDto(dto: UpdateBrandDto): Partial<Brand> {
    const out: Partial<Brand> = {};
    if (dto.name !== undefined) out.name = dto.name;
    if (dto.image !== undefined) out.image = dto.image;
    return out;
  }
  static toDto(model: Brand): Brand {
    return model;
  }
}
