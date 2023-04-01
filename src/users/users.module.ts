import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { OrdersController } from './controllers/orders.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
  ],
  providers: [UsersService, CustomersService],
  exports: [UsersService, CustomersService],
  imports: [ProductsModule],
})
export class UsersModule {}
