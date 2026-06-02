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

import { CreateCategoryUseCase } from '@products/application/create-category.use-case.service';
import { FindAllCategoriesUseCase } from '@products/application/find-all-categories.use-case.service';
import { FindOneCategoryUseCase } from '@products/application/find-one-category.use-case.service';
import { UpdateCategoryUseCase } from '@products/application/update-category.use-case.service';
import { DeleteCategoryUseCase } from '@products/application/delete-category.use-case.service';
import type { Category } from '../../../../../domain/models/category.entity';
import { CreateCategoryDto, UpdateCategoryDtoDto } from '../dtos/categories.dto';
import { CategoryMapper } from '../mappers/category.mapper';
import { CategoryNotFoundError } from '@products/domain/errors/category-not-found.error';

@Controller({
  path: 'categories',
  version: '1',
})
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findAllCategoriesUseCase: FindAllCategoriesUseCase,
    private readonly findOneCategoryUseCase: FindOneCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  // @Get()
  // getAll(
  //   @Query('limit') limit = 100,
  //   @Query('offset') offset = 0,
  //   @Query('brand') brand: string,
  // ) {
  //   return this.service.findAll();
  // }

  /**
   * Get all Categories
   *
   * @return {*} {Category[]}
   * @memberof CategoriesController
   */
  @Get()
  async getAll(): Promise<Category[]> {
    const categories = await this.findAllCategoriesUseCase.execute();
    return Array.isArray(categories) ? categories.map((x) => CategoryMapper.toDto(x)) : categories;
  }

  /**
   * Get one Category
   *
   * @param {number} categoryId - Category id
   * @return {*} {Category}
   * @memberof CategoriesController
   */
  @Get(':categoryId')
  async getOne(@Param('categoryId', ParseIntPipe) categoryId: number): Promise<Category> {
    try {
      const category = await this.findOneCategoryUseCase.execute(categoryId);
      return CategoryMapper.toDto(category);
    } catch (error) {
      if (error instanceof CategoryNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  /**
   * Create a Category
   *
   * @param {CreateCategoryDto} payload - Category data
   * @return {*} {Category}
   * @memberof CategoriesController
   */
  @Post()
  async create(@Body() payload: CreateCategoryDto): Promise<Category> {
    const modelPayload = CategoryMapper.fromCreateDto(payload);
    const created = await this.createCategoryUseCase.execute(modelPayload);
    return CategoryMapper.toDto(created);
  }

  /**
   * Update a Category
   *
   * @param {number} id - Category id
   * @param {UpdateCategoryDtoDto} payload - Category data
   * @return {*} {Category | null}
   * @memberof CategoriesController
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDtoDto,
  ): Promise<Category> {
    try {
      const modelPayload = CategoryMapper.fromUpdateDto(payload);
      const updated = await this.updateCategoryUseCase.execute(id, modelPayload);
      return CategoryMapper.toDto(updated);
    } catch (error) {
      if (error instanceof CategoryNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  /**
   * Delete a Category
   *
   * @param {number} id - Category id
   * @memberof CategoriesController
   */
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.deleteCategoryUseCase.execute(id);
    } catch (error) {
      if (error instanceof CategoryNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
