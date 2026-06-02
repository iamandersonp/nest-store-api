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

import { CreateBrandV2UseCase } from '@products/application/create-brand-v2.use-case.service';
import { GetAllBrandsV2UseCase } from '@products/application/get-all-brands-v2.use-case.service';
import { GetBrandV2UseCase } from '@products/application/get-brand-v2.use-case.service';
import { UpdateBrandV2UseCase } from '@products/application/update-brand-v2.use-case.service';
import { DeleteBrandV2UseCase } from '@products/application/delete-brand-v2.use-case.service';
import type { Brand } from '@products/domain/models/brand.entity';
import { BrandNotFoundError } from '@products/domain/errors/brand-not-found.error';
import {
  CreateBrandV2Dto,
  UpdateBrandV2Dto,
} from '@products/infrastructure/adapters/in/v2/dtos/brands-v2.dto';
import { BrandV2Mapper } from '@products/infrastructure/adapters/in/v2/mappers/brand-v2.mapper';

@Controller({
  path: 'brands',
  version: '2',
})
export class BrandsV2Controller {
  constructor(
    private readonly createBrandV2UseCase: CreateBrandV2UseCase,
    private readonly getAllBrandsV2UseCase: GetAllBrandsV2UseCase,
    private readonly getBrandV2UseCase: GetBrandV2UseCase,
    private readonly updateBrandV2UseCase: UpdateBrandV2UseCase,
    private readonly deleteBrandV2UseCase: DeleteBrandV2UseCase,
  ) {}

  /**
   * Get all Brands v2
   *
   * @return {*} {Brand[]}
   * @memberof BrandsV2Controller
   */
  @Get()
  async getAll(): Promise<Brand[]> {
    const brands = await this.getAllBrandsV2UseCase.execute();
    return brands.map((x) => BrandV2Mapper.toDto(x));
  }

  /**
   * Get one Brand v2
   *
   * @param {number} brandId - Brand id
   * @return {*} {Brand}
   * @memberof BrandsV2Controller
   */
  @Get(':brandId')
  async getOne(@Param('brandId', ParseIntPipe) brandId: number): Promise<Brand> {
    try {
      const brand = await this.getBrandV2UseCase.execute(brandId);
      return BrandV2Mapper.toDto(brand);
    } catch (error) {
      if (error instanceof BrandNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  /**
   * Create a Brand v2
   *
   * @param {CreateBrandV2Dto} payload - Brand data
   * @return {*} {Brand}
   * @memberof BrandsV2Controller
   */
  @Post()
  async create(@Body() payload: CreateBrandV2Dto): Promise<Brand> {
    const modelPayload = BrandV2Mapper.fromCreateDto(payload);
    const created = await this.createBrandV2UseCase.execute(modelPayload);
    return BrandV2Mapper.toDto(created);
  }

  /**
   * Update a Brand v2
   *
   * @param {number} id - Brand id
   * @param {UpdateBrandV2Dto} payload - Brand data
   * @return {*} {Brand}
   * @memberof BrandsV2Controller
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandV2Dto,
  ): Promise<Brand> {
    try {
      const modelPayload = BrandV2Mapper.fromUpdateDto(payload);
      const updated = await this.updateBrandV2UseCase.execute(id, modelPayload);
      return BrandV2Mapper.toDto(updated);
    } catch (error) {
      if (error instanceof BrandNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  /**
   * Delete a Brand v2
   *
   * @param {number} id - Brand id
   * @memberof BrandsV2Controller
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.deleteBrandV2UseCase.execute(id);
    } catch (error) {
      if (error instanceof BrandNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
