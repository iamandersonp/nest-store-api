import { Inject, Injectable } from '@nestjs/common';
import type { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { Brand } from '@products/domain/models/brand.entity';
import { BRANDS_SERVICE_PORT } from '@products/domain/ports/brand.port';
import {
  CreateBrandDto,
  UpdateBrandDto,
} from '@products/infrastructure/adapters/in/v1/dtos/brands.dto';

@Injectable()
export class FindOneBrandUseCase {
  constructor(
    @Inject(BRANDS_SERVICE_PORT)
    private readonly service: BaseCrudService<Brand, CreateBrandDto, UpdateBrandDto>,
  ) {}

  execute(id: number): Brand | Promise<Brand> {
    return this.service.findOne(id);
  }
}
