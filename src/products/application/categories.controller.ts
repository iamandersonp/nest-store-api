import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDtoDto } from '../domain/dtos/categories.dto';
import type { Category } from '../domain/models/category.entity';
import { CategoriesService } from '../infrastructure/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

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
  getAll(): Category[] {
    return this.service.findAll();
  }

  /**
   * Get one Category
   *
   * @param {number} categoryId - Category id
   * @return {*} {Category}
   * @memberof CategoriesController
   */
  @Get(':categoryId')
  getOne(@Param('categoryId', ParseIntPipe) categoryId: number): Category {
    return this.service.findOne(categoryId);
  }

  /**
   * Create a Category
   *
   * @param {CreateCategoryDto} payload - Category data
   * @return {*} {Category}
   * @memberof CategoriesController
   */
  @Post()
  create(@Body() payload: CreateCategoryDto): Category {
    return this.service.create(payload);
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDtoDto,
  ): Category | null {
    return this.service.update(id, payload);
  }

  /**
   * Delete a Category
   *
   * @param {number} id - Category id
   * @memberof CategoriesController
   */
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
