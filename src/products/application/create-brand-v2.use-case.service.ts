import { Inject, Injectable } from '@nestjs/common';
import type { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import type { Brand } from '@products/domain/models/brand.entity';
import { BRANDS_PRISMA_PORT } from '@products/domain/ports/brands-prisma.port';
import { CreateBrandCommand } from '@products/application/commands';

@Injectable()
export class CreateBrandV2UseCase {
  constructor(
    @Inject(BRANDS_PRISMA_PORT)
    private readonly service: BaseCrudService<Brand, CreateBrandCommand, any>,
  ) {}

  async execute(payload: CreateBrandCommand): Promise<Brand> {
    return this.service.create(payload);
  }
}
