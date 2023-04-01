import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '../models/category.interface';
import {
  CreateCategoryDto,
  UpdateCategoryDtoDto,
} from '../dtos/categories-dto.interface';

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
  findAll() {
    return this.categories;
  }

  /**
   * Find one category by id
   *
   * @param {number} id - category id
   * @return {*}  {category}
   * @memberof CategoriesService
   */
  findOne(id: number): Category {
    const category = this.categories.find(
      (item) => item.id === id,
    );
    if (!category) {
      throw new NotFoundException(
        `category ${id} not Found`,
      );
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
  update(
    id: number,
    payload: UpdateCategoryDtoDto,
  ): Category {
    const categoryId = this.findIndex(id);
    if (categoryId) {
      const category = this.findOne(id);
      this.categories[categoryId] = {
        ...category,
        ...payload,
      };
      return this.categories[id];
    }
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
      throw new NotFoundException(
        `category ${id} not Found`,
      );
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
    return this.categories.findIndex(
      (item) => item.id === id,
    );
  }
}
