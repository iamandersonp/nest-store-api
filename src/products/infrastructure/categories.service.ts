import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDtoDto } from '../domain/dtos/categories.dto';
import type { Category } from '../domain/models/category.entity';

@Injectable()
export class CategoriesService {
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
      throw new NotFoundException(`category ${id} not Found`);
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
  update(id: number, payload: UpdateCategoryDtoDto): Category | null {
    const categoryId = this.findIndex(id);
    if (categoryId === -1) {
      throw new NotFoundException(`Category ${id} not Found`);
    }

    const category = this.findOne(id);
    this.categories[categoryId] = {
      ...category,
      ...payload,
    };
    return this.categories[id];
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
      throw new NotFoundException(`Category ${id} not Found`);
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
