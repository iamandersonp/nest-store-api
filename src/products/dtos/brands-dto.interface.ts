import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

/**
 * Create Brand DTO
 *
 * @export
 * @class CreateBrandDto
 */
export class CreateBrandDto {
  /**
   * Brand id
   *
   * @type {number}
   * @memberof Brand
   */
  @IsNumber()
  @IsPositive()
  id: number;
  /**
   * Brand name
   *
   * @type {string}
   * @memberof Brand
   */
  @IsString()
  @IsNotEmpty()
  name: string;
  /**
   * Brand image
   *
   * @type {string}
   * @memberof Brand
   */
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;
}

export class UpdateBrandDto extends PartialType(
  CreateBrandDto,
) {}
