import { Inject, Injectable } from '@nestjs/common';
import { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import type { Product } from '@products/domain/models/product.entity';
import type { CreateProductCommand, UpdateProductCommand } from '@products/application/commands';
import { ProductNotFoundError } from '@products/domain/errors/product-not-found.error';
import { PRISMA_SERVICE_PORT } from '@products/domain/ports/prisma-service.port';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsPrismaAdapter implements BaseCrudService<
  Product,
  CreateProductCommand,
  UpdateProductCommand
> {
  constructor(
    @Inject(PRISMA_SERVICE_PORT)
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.prismaService.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prismaService.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new ProductNotFoundError(id);
    }
    return product;
  }

  async create(payload: CreateProductCommand): Promise<Product> {
    return this.prismaService.prisma.product.create({
      data: payload,
    });
  }

  async update(id: number, payload: UpdateProductCommand): Promise<Product> {
    await this.findOne(id);
    return this.prismaService.prisma.product.update({
      where: { id },
      data: payload,
    });
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.prismaService.prisma.product.delete({
      where: { id },
    });
  }
}
