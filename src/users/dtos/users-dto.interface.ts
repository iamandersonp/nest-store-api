import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';

/**
 * Create User DTO
 *
 * @export
 * @class CreateUserDto
 */
export class CreateUserDto {
  /**
   * First name
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  /**
   * Last name
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  /**
   * User name
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsString()
  @IsNotEmpty()
  readonly userName: string;

  /**
   * Password
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

/**
 * Update User DTO
 *
 * @export
 * @class UpdateUserDto
 * @extends {PartialType(CreateUserDto,
)}
 */
export class UpdateUserDto extends PartialType(
  CreateUserDto,
) {}
