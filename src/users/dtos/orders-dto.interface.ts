import { PartialType } from '@nestjs/mapped-types';
import {
  IsNumber,
  IsPositive,
  IsDate,
} from 'class-validator';

export class CreateOrdersDto {
  /**
   * Customer ID
   *
   * @type {number}
   * @memberof CreateOrdersDto
   */
  @IsNumber()
  @IsPositive()
  readonly customerId: number;
  /**
   * Date
   *
   * @type {string}
   * @memberof CreateOrdersDto
   */
  @IsDate()
  readonly date: string;

  /**
   *
   *
   * @type {number}
   * @memberof CreateOrdersDto
   */
  @IsNumber()
  @IsPositive()
  readonly total: number;
}

/**
 * Update Orders DTO
 *
 * @export
 * @class UpdateOrdersDto
 * @extends {PartialType(
 *   CreateOrdersDto,
 * )}
 */
export class UpdateOrdersDto extends PartialType(
  CreateOrdersDto,
) {}
