import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsUrl,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

/**
 * Create Products DTO
 *
 * @export
 * @class CreateProductsDto
 */
export class CreateProductsDto {
  /**
   * Name
   *
   * @type {string}
   * @memberof CreateProductsDto
   */
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  /**
   * Description
   *
   * @type {string}
   * @memberof CreateProductsDto
   */
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  /**
   * Price
   *
   * @type {number}
   * @memberof CreateProductsDto
   */
  @IsNumber()
  @IsPositive()
  readonly price: number;

  /**
   * Stock
   *
   * @type {number}
   * @memberof CreateProductsDto
   */
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  /**
   * Image
   *
   * @type {string}
   * @memberof CreateProductsDto
   */
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}

/**
 * Update Products DTO
 *
 * @export
 * @class UpdateProductsDto
 * @extends {PartialType(CreateProductsDto)}
 */
export class UpdateProductsDto extends PartialType(
  CreateProductsDto,
) {}
