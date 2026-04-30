import { Inject, Injectable } from '@nestjs/common';

import type { BasseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { Brand } from '@products/domain/models/brand.entity';
import { BRANDS_SERVICE_PORT } from '@products/domain/ports/brand.port';
import {
  CreateBrandDto,
  UpdateBrandDto,
} from '@products/infrastructure/adapters/in/v1/dtos/brands.dto';

@Injectable()
export class BrandUseCaseService {
  constructor(
    @Inject(BRANDS_SERVICE_PORT)
    private readonly service: BasseCrudService<Brand, CreateBrandDto, UpdateBrandDto>,
  ) {}

  /**
   * Get all Brands
   *
   * @return {*}  {(Brand[] | Promise<Brand[]>)}
   * @memberof BrandUseCaseService
   */
  findAll(): Brand[] | Promise<Brand[]> {
    return this.service.findAll();
  }

  /**
   * Get a brand by its id
   *
   * @param {number} brandId
   * @return {*}  {(Brand | Promise<Brand>)}
   * @memberof BrandUseCaseService
   */
  findOne(brandId: number): Brand | Promise<Brand> {
    return this.service.findOne(brandId);
  }

  /**
   * Create a brand
   *
   * @param {CreateBrandDto} payload
   * @return {*}  {(Brand | Promise<Brand>)}
   * @memberof BrandUseCaseService
   */
  create(payload: CreateBrandDto): Brand | Promise<Brand> {
    return this.service.create(payload);
  }

  /**
   * Update a brand by its id
   *
   * @param {number} id
   * @param {UpdateBrandDto} payload
   * @return {*}  {(Brand | Promise<Brand>)}
   * @memberof BrandUseCaseService
   */
  update(id: number, payload: UpdateBrandDto): Brand | Promise<Brand> {
    return this.service.update(id, payload);
  }

  /**
   * Delete a brand
   *
   * @param {number} id
   * @return {*}  {(void | Promise<void>)}
   * @memberof BrandUseCaseService
   */
  delete(id: number): void | Promise<void> {
    return this.service.delete(id);
  }
}
