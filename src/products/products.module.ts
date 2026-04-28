import { Module } from '@nestjs/common';
import { BrandsController } from './application/brands.controller';
import { CategoriesController } from './application/categories.controller';
import { ProductsController } from './application/products.controller';
import { BRANDS_SERVICE_PORT } from './domain/ports/brand.port';
import { CATEGORIES_SERVICE_PORT } from './domain/ports/category.port';
import { PRODUCTS_SERVICE_PORT } from './domain/ports/product.port';
import { BrandsService } from './infrastructure/in-memory/brands.service';
import { CategoriesService } from './infrastructure/in-memory/categories.service';
import { ProductsService } from './infrastructure/in-memory/products.service';

@Module({
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [
    {
      provide: PRODUCTS_SERVICE_PORT,
      useClass: ProductsService,
    },
    {
      provide: BRANDS_SERVICE_PORT,
      useClass: BrandsService,
    },
    {
      provide: CATEGORIES_SERVICE_PORT,
      useClass: CategoriesService,
    },
  ],
  exports: [PRODUCTS_SERVICE_PORT, BRANDS_SERVICE_PORT, CATEGORIES_SERVICE_PORT],
})
export class ProductsModule {}
