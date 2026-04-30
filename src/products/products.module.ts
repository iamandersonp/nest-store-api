import { Module } from '@nestjs/common';

import { BrandUseCaseService } from './application/brand-use-case.service';
import { CategoryUseCaseService } from './application/category-use-case.service';
import { ProductUseCaseService } from './application/product-use-case.service';
import { BRANDS_SERVICE_PORT } from './domain/ports/brand.port';
import { CATEGORIES_SERVICE_PORT } from './domain/ports/category.port';
import { PRODUCTS_SERVICE_PORT } from './domain/ports/product.port';
import { BrandsController } from './infrastructure/adapters/in/v1/controllers/brands.controller';
import { CategoriesController } from './infrastructure/adapters/in/v1/controllers/categories.controller';
import { ProductsController } from './infrastructure/adapters/in/v1/controllers/products.controller';
import { BrandsService } from './infrastructure/adapters/in/v1/services/brands.service';
import { CategoriesService } from './infrastructure/adapters/in/v1/services/categories.service';
import { ProductsService } from './infrastructure/adapters/in/v1/services/products.service';

@Module({
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [
    BrandUseCaseService,
    CategoryUseCaseService,
    ProductUseCaseService,
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
  exports: [BrandUseCaseService, CategoryUseCaseService, ProductUseCaseService],
})
export class ProductsModule {}
