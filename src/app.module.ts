import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { BrandsController } from './brands/brands.controller';
import { BrandsService } from './brands/brands.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    CustomersController,
    UsersController,
    ProductsController,
    CategoriesController,
    OrdersController,
    BrandsController,
  ],
  providers: [
    AppService,
    CustomersService,
    UsersService,
    ProductsService,
    CategoriesService,
    OrdersService,
    BrandsService,
  ],
})
export class AppModule {}
