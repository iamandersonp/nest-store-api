import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
  firstName!: string;

  /**
   * Last name
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  /**
   * User name
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsString()
  @IsNotEmpty()
  userName!: string;

  /**
   * Password
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsString()
  @IsNotEmpty()
  password!: string;

  /**
   * Role
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsString()
  @IsNotEmpty()
  role!: string;
}

/**
 * Update User DTO
 *
 * @export
 * @class UpdateUserDto
 * @extends {PartialType(CreateUserDto)}
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
