import { Brand } from '@products/domain/models/brand.entity';
import {
  CreateBrandDto,
  UpdateBrandDto,
} from '@products/infrastructure/adapters/in/v1/dtos/brands.dto';
import { CreateBrandCommand, UpdateBrandCommand } from '@products/application/commands';

/**
 * Mapper de Brand <-> DTOs HTTP
 */
export class BrandMapper {
  static fromCreateDto(dto: CreateBrandDto): CreateBrandCommand {
    return new CreateBrandCommand({ name: dto.name, image: dto.image });
  }
  static fromUpdateDto(dto: UpdateBrandDto): UpdateBrandCommand {
    return new UpdateBrandCommand({
      ...(dto.name !== undefined && { name: dto.name }),
      ...(dto.image !== undefined && { image: dto.image }),
    });
  }
  static toDto(model: Brand): Brand {
    return model;
  }
}
