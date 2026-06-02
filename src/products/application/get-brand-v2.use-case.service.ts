import { Inject, Injectable } from '@nestjs/common';
import type { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import type { Brand } from '@products/domain/models/brand.entity';
import { BRANDS_PRISMA_PORT } from '@products/domain/ports/brands-prisma.port';

@Injectable()
export class GetBrandV2UseCase {
  constructor(
    @Inject(BRANDS_PRISMA_PORT)
    private readonly service: BaseCrudService<Brand, any, any>,
  ) {}

  async execute(id: number): Promise<Brand> {
    return this.service.findOne(id);
  }
}
