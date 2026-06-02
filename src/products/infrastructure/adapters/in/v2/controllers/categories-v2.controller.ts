import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateCategoryV2UseCase } from '@products/application/create-category-v2.use-case.service';
import { GetAllCategoriesV2UseCase } from '@products/application/get-all-categories-v2.use-case.service';
import { GetCategoryV2UseCase } from '@products/application/get-category-v2.use-case.service';
import { UpdateCategoryV2UseCase } from '@products/application/update-category-v2.use-case.service';
import { DeleteCategoryV2UseCase } from '@products/application/delete-category-v2.use-case.service';
import type { Category } from '@products/domain/models/category.entity';
import { CategoryNotFoundError } from '@products/domain/errors/category-not-found.error';
import {
  CreateCategoryV2Dto,
  UpdateCategoryV2Dto,
} from '@products/infrastructure/adapters/in/v2/dtos/categories-v2.dto';
import { CategoryV2Mapper } from '@products/infrastructure/adapters/in/v2/mappers/category-v2.mapper';

@Controller({
  path: 'categories',
  version: '2',
})
export class CategoriesV2Controller {
  constructor(
    private readonly createCategoryV2UseCase: CreateCategoryV2UseCase,
    private readonly getAllCategoriesV2UseCase: GetAllCategoriesV2UseCase,
    private readonly getCategoryV2UseCase: GetCategoryV2UseCase,
    private readonly updateCategoryV2UseCase: UpdateCategoryV2UseCase,
    private readonly deleteCategoryV2UseCase: DeleteCategoryV2UseCase,
  ) {}

  /**
   * Get all Categories v2
   *
   * @return {*} {Category[]}
   * @memberof CategoriesV2Controller
   */
  @Get()
  async getAll(): Promise<Category[]> {
    const categories = await this.getAllCategoriesV2UseCase.execute();
    return categories.map((x) => CategoryV2Mapper.toDto(x));
  }

  /**
   * Get one Category v2
   *
   * @param {number} categoryId - Category id
   * @return {*} {Category}
   * @memberof CategoriesV2Controller
   */
  @Get(':categoryId')
  async getOne(@Param('categoryId', ParseIntPipe) categoryId: number): Promise<Category> {
    try {
      const category = await this.getCategoryV2UseCase.execute(categoryId);
      return CategoryV2Mapper.toDto(category);
    } catch (error) {
      if (error instanceof CategoryNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  /**
   * Create a Category v2
   *
   * @param {CreateCategoryV2Dto} payload - Category data
   * @return {*} {Category}
   * @memberof CategoriesV2Controller
   */
  @Post()
  async create(@Body() payload: CreateCategoryV2Dto): Promise<Category> {
    const modelPayload = CategoryV2Mapper.fromCreateDto(payload);
    const created = await this.createCategoryV2UseCase.execute(modelPayload);
    return CategoryV2Mapper.toDto(created);
  }

  /**
   * Update a Category v2
   *
   * @param {number} id - Category id
   * @param {UpdateCategoryV2Dto} payload - Category data
   * @return {*} {Category}
   * @memberof CategoriesV2Controller
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryV2Dto,
  ): Promise<Category> {
    try {
      const modelPayload = CategoryV2Mapper.fromUpdateDto(payload);
      const updated = await this.updateCategoryV2UseCase.execute(id, modelPayload);
      return CategoryV2Mapper.toDto(updated);
    } catch (error) {
      if (error instanceof CategoryNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  /**
   * Delete a Category v2
   *
   * @param {number} id - Category id
   * @memberof CategoriesV2Controller
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.deleteCategoryV2UseCase.execute(id);
    } catch (error) {
      if (error instanceof CategoryNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
