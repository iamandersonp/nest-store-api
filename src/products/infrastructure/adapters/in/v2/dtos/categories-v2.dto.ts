import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Create Category V2 DTO
 *
 * @export
 * @class CreateCategoryV2Dto
 */
export class CreateCategoryV2Dto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;
}

/**
 * Update Category V2 DTO
 *
 * @export
 * @class UpdateCategoryV2Dto
 * @extends {PartialType(CreateCategoryV2Dto)}
 */
export class UpdateCategoryV2Dto extends PartialType(CreateCategoryV2Dto) {}
