import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { CustomersController } from './application/customers.controller';
import { OrdersController } from './application/orders.controller';
import { UsersController } from './application/users.controller';
import { CUSTOMERS_SERVICE_PORT } from './domain/ports/customer.port';
import { USERS_SERVICE_PORT } from './domain/ports/user.port';
import { CustomersService } from './infrastructure/in-memory/customers.service';
import { UsersService } from './infrastructure/in-memory/users.service';

@Module({
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [
    {
      provide: USERS_SERVICE_PORT,
      useClass: UsersService,
    },
    { provide: CUSTOMERS_SERVICE_PORT, useClass: CustomersService },
  ],
  exports: [USERS_SERVICE_PORT, CUSTOMERS_SERVICE_PORT],
  imports: [ProductsModule],
})
export class UsersModule {}
