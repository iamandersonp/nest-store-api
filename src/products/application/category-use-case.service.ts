import { Inject, Injectable } from '@nestjs/common';

import type { BasseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { Category } from '@products/domain/models/category.entity';
import { CATEGORIES_SERVICE_PORT } from '@products/domain/ports/category.port';
import {
  CreateCategoryDto,
  UpdateCategoryDtoDto,
} from '@products/infrastructure/adapters/in/v1/dtos/categories.dto';

@Injectable()
export class CategoryUseCaseService {
  /**
   * Creates an instance of ProductUseCaseService.
   * @param {BasseCrudService<Category, CreateCategoryDto, UpdateCategoryDtoDto>} service
   * @memberof ProductUseCaseService
   */
  constructor(
    @Inject(CATEGORIES_SERVICE_PORT)
    private readonly service: BasseCrudService<Category, CreateCategoryDto, UpdateCategoryDtoDto>,
  ) {}

  /**
   * Get all Categories
   *
   * @return {*}  {(Category[] | Promise<Category[]>)}
   * @memberof CategoryUseCaseService
   */
  findAll(): Category[] | Promise<Category[]> {
    return this.service.findAll();
  }

  /**
   * Get a category by its id
   *
   * @param {number} categoryId
   * @return {*}  {(Category | Promise<Category>)}
   * @memberof CategoryUseCaseService
   */
  findOne(categoryId: number): Category | Promise<Category> {
    return this.service.findOne(categoryId);
  }

  /**
   * Create a category
   *
   * @param {CreateCategoryDto} payload
   * @return {*}  {(Category | Promise<Category>)}
   * @memberof CategoryUseCaseService
   */
  create(payload: CreateCategoryDto): Category | Promise<Category> {
    return this.service.create(payload);
  }

  /**
   * Update a category
   *
   * @param {number} id
   * @param {UpdateCategoryDtoDto} payload
   * @return {*}  {(Category | Promise<Category>)}
   * @memberof CategoryUseCaseService
   */
  update(id: number, payload: UpdateCategoryDtoDto): Category | Promise<Category> {
    return this.service.update(id, payload);
  }

  /**
   * Delete a category
   *
   * @param {number} id
   * @return {*}  {(void | Promise<void>)}
   * @memberof CategoryUseCaseService
   */
  delete(id: number): void | Promise<void> {
    return this.service.delete(id);
  }
}
