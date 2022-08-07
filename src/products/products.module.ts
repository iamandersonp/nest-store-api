import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';

@Module({
  controllers: [
    ProductsController,
    BrandsController,
    CategoriesController,
  ],
  providers: [
    ProductsService,
    BrandsService,
    CategoriesService,
  ],
  exports: [
    ProductsService,
    BrandsService,
    CategoriesService,
  ],
})
export class ProductsModule {}
