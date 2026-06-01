import { Module } from '@nestjs/common';

import { BrandUseCaseService } from './application/brand-use-case.service';
import { CategoryUseCaseService } from './application/category-use-case.service';
import { CreateProductUseCase } from './application/create-product.use-case';
import { FindAllProductsUseCase } from './application/find-all-products.use-case';
import { FindOneProductUseCase } from './application/find-one-product.use-case';
import { UpdateProductUseCase } from './application/update-product.use-case';
import { DeleteProductUseCase } from './application/delete-product.use-case';
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
    CreateProductUseCase,
    FindAllProductsUseCase,
    FindOneProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
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
  exports: [BrandUseCaseService, CategoryUseCaseService, FindAllProductsUseCase],
})
export class ProductsModule {}
