import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import {
  CreateCategoryDto,
  UpdateCategoryDtoDto,
} from '../dtos/categories-dto.interface';

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
   * @return {*} Category[]
   * @memberof CategoriesController
   */
  @Get()
  getAll() {
    return this.service.findAll();
  }

  /**
   * Get one Category
   *
   * @param {number} categoryId - Category id
   * @return {*} Category
   * @memberof CategoriesController
   */
  @Get(':categoryId')
  getOne(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.service.findOne(categoryId);
  }

  /**
   * Create a Category
   *
   * @param {CreateCategoryDto} payload - Category data
   * @return {*} Category
   * @memberof CategoriesController
   */
  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.service.create(payload);
  }

  /**
   * Update a Category
   *
   * @param {number} id - Category id
   * @param {UpdateCategoryDtoDto} payload - Category data
   * @return {*} Category
   * @memberof CategoriesController
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDtoDto,
  ) {
    return this.service.update(id, payload);
  }

  /**
   * Delete a Category
   *
   * @param {number} id - Category id
   * @return {*} Category
   * @memberof CategoriesController
   */
  @Delete()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
