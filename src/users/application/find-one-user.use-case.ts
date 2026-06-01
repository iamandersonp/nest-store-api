import { Inject, Injectable } from '@nestjs/common';
import type { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { User } from '@users/domain/models/user.entity';
import { USERS_SERVICE_PORT } from '@users/domain/ports/user.port';
import { CreateUserDto, UpdateUserDto } from '@users/infrastructure/adapters/in/v1/dtos/user.dto';

@Injectable()
export class FindOneUserUseCase {
  constructor(
    @Inject(USERS_SERVICE_PORT)
    private readonly service: BaseCrudService<User, CreateUserDto, UpdateUserDto>,
  ) {}

  execute(id: number): User | Promise<User> {
    return this.service.findOne(id);
  }
}
