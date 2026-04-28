import { Module } from '@nestjs/common';
import { BrandsController } from './application/brands.controller';
import { CategoriesController } from './application/categories.controller';
import { ProductsController } from './application/products.controller';
import { BrandsService } from './infrastructure/brands.service';
import { CategoriesService } from './infrastructure/categories.service';
import { ProductsService } from './infrastructure/products.service';

@Module({
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService, BrandsService, CategoriesService],
})
export class ProductsModule {}
