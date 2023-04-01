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
import { BrandsService } from '../services/brands.service';
import {
  CreateBrandDto,
  UpdateBrandDto,
} from '../dtos/brands-dto.interface';

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
   * @return {*} Brand[]
   * @memberof BrandsController
   */
  @Get()
  getAll() {
    return this.service.findAll();
  }

  /**
   * Get one Brand
   *
   * @param {number} categoryId - brand id
   * @return {*} Brand
   * @memberof BrandsService
   */
  @Get(':brandId')
  getOne(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.service.findOne(brandId);
  }

  /**
   * Create a Brand
   *
   * @param {CreateBrandDto} payload - Brand data
   * @return {*} Brand
   * @memberof BrandsService
   */
  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.service.create(payload);
  }

  /**
   * Update a Brand
   *
   * @param {number} id - Brand id
   * @param {UpdateBrandDto} payload - Brand data
   * @return {*} Category
   * @memberof BrandsService
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.service.update(id, payload);
  }

  /**
   * Delete a Category
   *
   * @param {number} id - Category id
   * @return {*} Category
   * @memberof BrandsService
   */
  @Delete()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
