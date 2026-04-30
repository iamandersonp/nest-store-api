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

import { BrandUseCaseService } from '@products/application/brand-use-case.service';
import type { Brand } from '../../../../../domain/models/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Controller({
  path: 'brands',
  version: '1',
})
export class BrandsController {
  /**
   * Creates an instance of BrandsController.
   * @param {BrandUseCaseService} service
   * @memberof BrandsController
   */
  constructor(private readonly service: BrandUseCaseService) {}

  // @Get()
  // getAll(
  //   @Query('limit') limit = 100,
  //   @Query('offset') offset = 0,
  //   @Query('brand') brand: string,
  // ) {
  //   return this.service.findAll();
  // }

  /**
   * Get all Brands
   *
   * @return {*} {Brand[]}
   * @memberof BrandsController
   */
  @Get()
  getAll(): Brand[] | Promise<Brand[]> {
    return this.service.findAll();
  }

  /**
   * Get one Brand
   *
   * @param {number} categoryId - brand id
   * @return {*} {Brand}
   * @memberof BrandsService
   */
  @Get(':brandId')
  getOne(@Param('brandId', ParseIntPipe) brandId: number): Brand | Promise<Brand> {
    return this.service.findOne(brandId);
  }

  /**
   * Create a Brand
   *
   * @param {CreateBrandDto} payload - Brand data
   * @return {*} {Brand}
   * @memberof BrandsService
   */
  @Post()
  create(@Body() payload: CreateBrandDto): Brand | Promise<Brand> {
    return this.service.create(payload);
  }

  /**
   * Update a Brand
   *
   * @param {number} id - Brand id
   * @param {UpdateBrandDto} payload - Brand data
   * @return {*} {Brand | undefined}
   * @memberof BrandsService
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ): Brand | Promise<Brand> {
    return this.service.update(id, payload);
  }

  /**
   * Delete a Category
   *
   * @param {number} id - Category id
   * @memberof BrandsService
   */
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): void | Promise<void> {
    return this.service.delete(id);
  }
}
