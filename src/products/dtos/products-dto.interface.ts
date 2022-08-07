import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsUrl,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateProductsDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}

export class UpdateProductsDto extends PartialType(
  CreateProductsDto,
) {}
