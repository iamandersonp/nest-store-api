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
import { BrandMapper } from '../mappers/brand.mapper';
import { BrandNotFoundError } from '@products/domain/errors/brand-not-found.error';
import { NotFoundException } from '@nestjs/common';

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
  async getAll(): Promise<Brand[]> {
    const brands = await this.service.findAll();
    return Array.isArray(brands) ? brands.map((x) => BrandMapper.toDto(x)) : brands;
  }

  /**
   * Get one Brand
   *
   * @param {number} categoryId - brand id
   * @return {*} {Brand}
   * @memberof BrandsService
   */
  @Get(':brandId')
  async getOne(@Param('brandId', ParseIntPipe) brandId: number): Promise<Brand> {
    try {
      const brand = await this.service.findOne(brandId);
      return BrandMapper.toDto(brand);
    } catch (error) {
      if (error instanceof BrandNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  /**
   * Create a Brand
   *
   * @param {CreateBrandDto} payload - Brand data
   * @return {*} {Brand}
   * @memberof BrandsService
   */
  @Post()
  async create(@Body() payload: CreateBrandDto): Promise<Brand> {
    const modelPayload = BrandMapper.fromCreateDto(payload);
    const created = await this.service.create(modelPayload);
    return BrandMapper.toDto(created);
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
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ): Promise<Brand> {
    try {
      const modelPayload = BrandMapper.fromUpdateDto(payload);
      const updated = await this.service.update(id, modelPayload);
      return BrandMapper.toDto(updated);
    } catch (error) {
      if (error instanceof BrandNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  /**
   * Delete a Category
   *
   * @param {number} id - Category id
   * @memberof BrandsService
   */
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.service.delete(id);
    } catch (error) {
      if (error instanceof BrandNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
