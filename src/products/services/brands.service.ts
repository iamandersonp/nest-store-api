import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Brand } from '../models/brand.interface';
import {
  CreateBrandDto,
  UpdateBrandDto,
} from '../dtos/brands-dto.interface';

@Injectable()
export class BrandsService {
  /**
   * Counter to generate the id
   *
   * @private
   * @memberof CategoriesService
   */
  private counterId = 1;
  /**
   * List of Brands
   *
   * @private
   * @type {Brand[]}
   * @memberof CategoriesService
   */
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      image: '',
    },
  ];

  /**
   * Find all the brands
   *
   * @return {*} {Brand[]} List of brands
   * @memberof CategoriesService
   */
  findAll(): Brand[] {
    return this.brands;
  }

  /**
   * Find one brand by id
   *
   * @param {number} id - Brand id
   * @return {*}  {Brand}
   * @memberof CategoriesService
   */
  findOne(id: number): Brand {
    const brand = this.brands.find(
      (item) => item.id === id,
    );
    if (!brand) {
      throw new NotFoundException(`Brand ${id} not Found`);
    }
    return brand;
  }

  /**
   * Create a new brand
   *
   * @param {CreateBrandDto} payload - Brand data
   * @return {*} {Brand}
   * @memberof CategoriesService
   */
  create(payload: CreateBrandDto): Brand {
    this.counterId++;
    const newBrand: Brand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  /**
   * Undate a brand
   *
   * @param {number} id - Brand ID
   * @param {CreateBrandDto} payload - Brand data
   * @return {*}  {Brand}
   * @memberof CategoriesService
   */
  update(id: number, payload: UpdateBrandDto): Brand {
    const brandId = this.findIndex(id);
    if (brandId) {
      const brand = this.findOne(id);
      this.brands[brandId] = {
        ...brand,
        ...payload,
      };
      return this.brands[id];
    }
  }

  /**
   * Delete a brand
   *
   * @param {number} id - Brand ID
   * @memberof CategoriesService
   */
  delete(id: number): void {
    const brandId = this.findIndex(id);
    if (brandId === -1) {
      throw new NotFoundException(`brand ${id} not Found`);
    }
    this.brands.splice(brandId, 1);
  }

  /**
   * find the index of the brand
   *
   * @private
   * @param {number} id - Brand ID
   * @return {*} {number}
   * @memberof CategoriesService
   */
  private findIndex(id: number): number {
    return this.brands.findIndex((item) => item.id === id);
  }
}
