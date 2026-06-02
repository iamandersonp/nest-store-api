import { Inject, Injectable } from '@nestjs/common';
import type { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import type { Brand } from '@products/domain/models/brand.entity';
import { BRANDS_PRISMA_PORT } from '@products/domain/ports/brands-prisma.port';
import { UpdateBrandCommand } from '@products/application/commands';

@Injectable()
export class UpdateBrandV2UseCase {
  constructor(
    @Inject(BRANDS_PRISMA_PORT)
    private readonly service: BaseCrudService<Brand, any, UpdateBrandCommand>,
  ) {}

  async execute(id: number, payload: UpdateBrandCommand): Promise<Brand> {
    return this.service.update(id, payload);
  }
}
