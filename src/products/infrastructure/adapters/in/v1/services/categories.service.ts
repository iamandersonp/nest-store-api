import { Injectable } from '@nestjs/common';
import { CategoryNotFoundError } from '@products/domain/errors/category-not-found.error';

import { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import type { Category } from '@products/domain/models/category.entity';
import { CreateCategoryDto, UpdateCategoryDtoDto } from '../dtos/categories.dto';

@Injectable()
export class CategoriesService implements BaseCrudService<
  Category,
  CreateCategoryDto,
  UpdateCategoryDtoDto
> {
  /**
   * Counter to generate the id
   *
   * @private
   * @memberof CategoriesService
   */
  private counterId = 1;

  /**
   * List of Categories
   *
   * @private
   * @memberof CategoriesService
   */
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
    },
  ];

  /**
   * Find all the categories
   *
   * @return {*} {Category[]} List of categories
   * @memberof CategoriesService
   */
  findAll(): Category[] {
    return this.categories;
  }

  /**
   * Find one category by id
   *
   * @param {number} id - category id
   * @return {*} {category}
   * @memberof CategoriesService
   */
  findOne(id: number): Category {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new CategoryNotFoundError(id);
    }
    return category;
  }

  /**
   * Create a new category
   *
   * @param {CreatecategoryDto} payload - category data
   * @return {*} {category}
   * @memberof CategoriesService
   */
  create(payload: CreateCategoryDto): Category {
    this.counterId++;
    const newcategory: Category = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newcategory);
    return newcategory;
  }

  /**
   * Undate a category
   *
   * @param {number} id - category ID
   * @param {CreatecategoryDto} payload - category data
   * @return {*}  {category}
   * @memberof CategoriesService
   */
  update(id: number, payload: UpdateCategoryDtoDto): Category {
    const categoryId = this.findIndex(id);
    if (categoryId === -1) {
      throw new CategoryNotFoundError(id);
    }

    const category = this.findOne(id);
    this.categories[categoryId] = {
      ...category,
      ...payload,
    };
    return this.categories[categoryId];
  }

  /**
   * Delete a category
   *
   * @param {number} id - category ID
   * @memberof CategoriesService
   */
  delete(id: number): void {
    const categoryId = this.findIndex(id);
    if (categoryId === -1) {
      throw new CategoryNotFoundError(id);
    }
    this.categories.splice(categoryId, 1);
  }

  /**
   * find the index of the category
   *
   * @private
   * @param {number} id - category ID
   * @return {*} {number}
   * @memberof CategoriesService
   */
  private findIndex(id: number): number {
    return this.categories.findIndex((item) => item.id === id);
  }
}
