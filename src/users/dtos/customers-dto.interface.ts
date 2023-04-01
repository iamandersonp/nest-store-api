import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateCustomerDto {
  /**
   * Phone
   *
   * @type {string}
   * @memberof CreateCustomerDto
   */
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string;

  /**
   * Photo
   *
   * @type {string}
   * @memberof CreateCustomerDto
   */
  @IsString()
  @IsNotEmpty()
  readonly photo: string;

  /**
   * Id User
   *
   * @type {number}
   * @memberof CreateCustomerDto
   */
  @IsNumber()
  @IsPositive()
  readonly idUser: number;
}

export class UpdateCustomerDto extends PartialType(
  CreateCustomerDto,
) {}
