import { Module } from '@nestjs/common';

import { ProductsModule } from '../products/products.module';
import { CustomerUseCaseService } from './application/customer-use-case.service';
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
    UserUseCaseService,
    CustomerUseCaseService,
    {
      provide: USERS_SERVICE_PORT,
      useClass: UsersService,
    },
    { provide: CUSTOMERS_SERVICE_PORT, useClass: CustomersService },
  ],
  exports: [UserUseCaseService, CustomerUseCaseService],
  imports: [ProductsModule],
})
export class UsersModule {}
