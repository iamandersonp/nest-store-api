import { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { Inject, Injectable } from '@nestjs/common';
import type { CreateBrandCommand, UpdateBrandCommand } from '@products/application/commands';
import { BrandNotFoundError } from '@products/domain/errors/brand-not-found.error';
import type { Brand } from '@products/domain/models/brand.entity';
import { PRISMA_SERVICE_PORT } from '@products/domain/ports/prisma-service.port';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BrandsPrismaAdapter implements BaseCrudService<
  Brand,
  CreateBrandCommand,
  UpdateBrandCommand
> {
  constructor(
    @Inject(PRISMA_SERVICE_PORT)
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(): Promise<Brand[]> {
    return this.prismaService.prisma.brand.findMany();
  }

  async findOne(id: number): Promise<Brand> {
    const brand = await this.prismaService.prisma.brand.findUnique({
      where: { id },
    });
    if (!brand) {
      throw new BrandNotFoundError(id);
    }
    return brand;
  }

  async create(payload: CreateBrandCommand): Promise<Brand> {
    return this.prismaService.prisma.brand.create({
      data: payload,
    });
  }

  async update(id: number, payload: UpdateBrandCommand): Promise<Brand> {
    await this.findOne(id);
    return this.prismaService.prisma.brand.update({
      where: { id },
      data: payload,
    });
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.prismaService.prisma.brand.delete({
      where: { id },
    });
  }
}
