import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Create Products DTO
 *
 * @export
 * @class CreateCategoryDto
 */
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;
}

/**
 * Update Products DTO
 *
 * @export
 * @class UpdateProductsDto
 * @extends {PartialType(CreateCategoryDto)}
 */
export class UpdateCategoryDtoDto extends PartialType(CreateCategoryDto) {}
