import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

/**
 * Create Brand V2 DTO
 *
 * @export
 * @class CreateBrandV2Dto
 */
export class CreateBrandV2Dto {
  /**
   * Brand name
   *
   * @type {string}
   * @memberof CreateBrandV2Dto
   */
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  /**
   * Brand image
   *
   * @type {string}
   * @memberof CreateBrandV2Dto
   */
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  readonly image!: string;
}

/**
 * Update Brand V2 DTO
 *
 * @export
 * @class UpdateBrandV2Dto
 * @extends {PartialType(CreateBrandV2Dto)}
 */
export class UpdateBrandV2Dto extends PartialType(CreateBrandV2Dto) {}
