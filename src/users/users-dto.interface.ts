export interface CreateUserDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly userName: string;
  readonly password: string;
}

export interface UpdateUserDto {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly userName?: string;
  readonly password?: string;
}
