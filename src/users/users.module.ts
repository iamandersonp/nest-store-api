import { Module } from '@nestjs/common';

import { ProductsModule } from '../products/products.module';
import { CreateCustomerUseCase } from './application/create-customer.use-case';
import { CustomerUseCaseService } from './application/customer-use-case.service';
import { CreateUserUseCase } from './application/create-user.use-case';
import { DeleteCustomerUseCase } from './application/delete-customer.use-case';
import { DeleteUserUseCase } from './application/delete-user.use-case';
import { FindAllCustomersUseCase } from './application/find-all-customers.use-case';
import { FindAllUsersUseCase } from './application/find-all-users.use-case';
import { FindOneCustomerUseCase } from './application/find-one-customer.use-case';
import { FindOneUserUseCase } from './application/find-one-user.use-case';
import { GetOrdersByUserUseCase } from './application/get-orders-by-user.use-case';
import { UpdateCustomerUseCase } from './application/update-customer.use-case';
import { UpdateUserUseCase } from './application/update-user.use-case';
import { UserUseCaseService } from './application/user-use-case.service';
import { CUSTOMERS_SERVICE_PORT } from './domain/ports/customer.port';
import { USERS_SERVICE_PORT } from './domain/ports/user.port';
import { CustomersController } from './infrastructure/adapters/in/v1/controllers/customers.controller';
import { OrdersController } from './infrastructure/adapters/in/v1/controllers/orders.controller';
import { UsersController } from './infrastructure/adapters/in/v1/controllers/users.controller';
import { CustomersService } from './infrastructure/adapters/in/v1/services/customers.service';
import { UsersService } from './infrastructure/adapters/in/v1/services/users.service';

@Module({
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [
    CreateCustomerUseCase,
    CreateUserUseCase,
    CustomerUseCaseService,
    DeleteCustomerUseCase,
    DeleteUserUseCase,
    FindAllCustomersUseCase,
    FindAllUsersUseCase,
    FindOneCustomerUseCase,
    FindOneUserUseCase,
    GetOrdersByUserUseCase,
    UpdateCustomerUseCase,
    UpdateUserUseCase,
    UserUseCaseService,
    {
      provide: USERS_SERVICE_PORT,
      useClass: UsersService,
    },
    { provide: CUSTOMERS_SERVICE_PORT, useClass: CustomersService },
  ],
  exports: [
    CreateCustomerUseCase,
    CreateUserUseCase,
    CustomerUseCaseService,
    DeleteCustomerUseCase,
    DeleteUserUseCase,
    FindAllCustomersUseCase,
    FindAllUsersUseCase,
    FindOneCustomerUseCase,
    FindOneUserUseCase,
    GetOrdersByUserUseCase,
    UpdateCustomerUseCase,
    UpdateUserUseCase,
    UserUseCaseService,
  ],
  imports: [ProductsModule],
})
export class UsersModule {}
