import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl } from 'class-validator';

/**
 * Create Products V2 DTO
 *
 * @export
 * @class CreateProductV2Dto
 */
export class CreateProductV2Dto {
  /**
   * Name
   *
   * @type {string}
   * @memberof CreateProductV2Dto
   */
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  /**
   * Description
   *
   * @type {string}
   * @memberof CreateProductV2Dto
   */
  @IsString()
  @IsNotEmpty()
  readonly description!: string;

  /**
   * Price
   *
   * @type {number}
   * @memberof CreateProductV2Dto
   */
  @IsNumber()
  @IsPositive()
  readonly price!: number;

  /**
   * Stock
   *
   * @type {number}
   * @memberof CreateProductV2Dto
   */
  @IsNumber()
  @IsPositive()
  readonly stock!: number;

  /**
   * Image
   *
   * @type {string}
   * @memberof CreateProductV2Dto
   */
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  readonly image!: string;
}

/**
 * Update Products V2 DTO
 *
 * @export
 * @class UpdateProductV2Dto
 * @extends {PartialType(CreateProductV2Dto)}
 */
export class UpdateProductV2Dto extends PartialType(CreateProductV2Dto) {}
