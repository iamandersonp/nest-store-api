import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

/**
 * Create Brand DTO
 *
 * @export
 * @class CreateBrandDto
 */
export class CreateBrandDto {
  /**
   * Brand name
   *
   * @type {string}
   * @memberof Brand
   */
  @IsString()
  @IsNotEmpty()
  name!: string;
  /**
   * Brand image
   *
   * @type {string}
   * @memberof Brand
   */
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image!: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
