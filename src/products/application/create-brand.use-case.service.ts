import { Inject, Injectable } from '@nestjs/common';
import type { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { Brand } from '@products/domain/models/brand.entity';
import { BRANDS_SERVICE_PORT } from '@products/domain/ports/brand.port';
import { CreateBrandDto } from '@products/infrastructure/adapters/in/v1/dtos/brands.dto';
import { CreateBrandCommand } from '@products/application/commands';

@Injectable()
export class CreateBrandUseCase {
  constructor(
    @Inject(BRANDS_SERVICE_PORT)
    private readonly service: BaseCrudService<Brand, CreateBrandDto, any>,
  ) {}

  execute(payload: CreateBrandCommand): Brand | Promise<Brand> {
    return this.service.create(payload);
  }
}
