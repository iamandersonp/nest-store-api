import { Brand } from '@products/domain/models/brand.entity';
import {
  CreateBrandV2Dto,
  UpdateBrandV2Dto,
} from '@products/infrastructure/adapters/in/v2/dtos/brands-v2.dto';
import { CreateBrandCommand, UpdateBrandCommand } from '@products/application/commands';

/**
 * Mapper de Brand <-> DTOs HTTP v2
 */
export class BrandV2Mapper {
  static fromCreateDto(dto: CreateBrandV2Dto): CreateBrandCommand {
    return new CreateBrandCommand({ name: dto.name, image: dto.image });
  }

  static fromUpdateDto(dto: UpdateBrandV2Dto): UpdateBrandCommand {
    return new UpdateBrandCommand({
      ...(dto.name !== undefined && { name: dto.name }),
      ...(dto.image !== undefined && { image: dto.image }),
    });
  }

  static toDto(model: Brand): Brand {
    return model;
  }
}
