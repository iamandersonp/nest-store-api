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
import { CreateBrandDto, UpdateBrandDto } from '../domain/dtos/brands.dto';
import type { Brand } from '../domain/models/brand.entity';
import { BrandsService } from '../infrastructure/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private service: BrandsService) {}

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
  getAll(): Brand[] {
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
  getOne(@Param('brandId', ParseIntPipe) brandId: number): Brand {
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
  create(@Body() payload: CreateBrandDto): Brand {
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
  ): Brand | undefined {
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
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
