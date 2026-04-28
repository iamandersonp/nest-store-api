import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { CustomersController } from './application/customers.controller';
import { OrdersController } from './application/orders.controller';
import { UsersController } from './application/users.controller';
import { CustomersService } from './infrastructure/customers.service';
import { UsersService } from './infrastructure/users.service';

@Module({
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [UsersService, CustomersService],
  exports: [UsersService, CustomersService],
  imports: [ProductsModule],
})
export class UsersModule {}
