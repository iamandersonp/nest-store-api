import { Inject, Injectable } from '@nestjs/common';
import type { BaseCrudService } from '@common/domain/interfaces/base-crud.interface';
import { Customer } from '@users/domain/models/customer.entity';
import { CUSTOMERS_SERVICE_PORT } from '@users/domain/ports/customer.port';
import { CreateCustomerDto } from '@users/infrastructure/adapters/in/v1/dtos/customers.dto';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    @Inject(CUSTOMERS_SERVICE_PORT)
    private readonly service: BaseCrudService<Customer, CreateCustomerDto, any>,
  ) {}

  execute(payload: CreateCustomerDto): Customer | Promise<Customer> {
    return this.service.create(payload);
  }
}
