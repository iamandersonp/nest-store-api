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
 * @class CreateCategoryDto
 */
export class CreateCategoryDto {
  /**
   * Name
   *
   * @type {string}
   * @memberof CreateCategoryDto
   */
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  /**
   * Description
   *
   * @type {string}
   * @memberof CreateCategoryDto
   */
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  /**
   * Price
   *
   * @type {number}
   * @memberof CreateCategoryDto
   */
  @IsNumber()
  @IsPositive()
  readonly price: number;

  /**
   * Stock
   *
   * @type {number}
   * @memberof CreateCategoryDto
   */
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  /**
   * Image
   *
   * @type {string}
   * @memberof CreateCategoryDto
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
 * @extends {PartialType(CreateCategoryDto)}
 */
export class UpdateCategoryDtoDto extends PartialType(
  CreateCategoryDto,
) {}
