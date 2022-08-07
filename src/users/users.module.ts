import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';

@Module({
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
  ],
  providers: [
    UsersService,
    CustomersService,
    OrdersService,
  ],
  exports: [UsersService, CustomersService, OrdersService],
})
export class UsersModule {}
