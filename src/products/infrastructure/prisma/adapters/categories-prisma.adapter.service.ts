import { Inject, Injectable } from '@nestjs/common';
import { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import type { Category } from '@products/domain/models/category.entity';
import type { CreateCategoryCommand, UpdateCategoryCommand } from '@products/application/commands';
import { CategoryNotFoundError } from '@products/domain/errors/category-not-found.error';
import { PRISMA_SERVICE_PORT } from '@products/domain/ports/prisma-service.port';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesPrismaAdapter implements BaseCrudService<
  Category,
  CreateCategoryCommand,
  UpdateCategoryCommand
> {
  constructor(
    @Inject(PRISMA_SERVICE_PORT)
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.prismaService.prisma.category.findMany();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.prismaService.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new CategoryNotFoundError(id);
    }
    return category;
  }

  async create(payload: CreateCategoryCommand): Promise<Category> {
    return this.prismaService.prisma.category.create({
      data: payload,
    });
  }

  async update(id: number, payload: UpdateCategoryCommand): Promise<Category> {
    await this.findOne(id);
    return this.prismaService.prisma.category.update({
      where: { id },
      data: payload,
    });
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.prismaService.prisma.category.delete({
      where: { id },
    });
  }
}
