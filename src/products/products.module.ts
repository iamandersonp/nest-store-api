import { Module } from '@nestjs/common';

import { CreateBrandUseCase } from './application/create-brand.use-case.service';
import { FindAllBrandsUseCase } from './application/find-all-brands.use-case.service';
import { FindOneBrandUseCase } from './application/find-one-brand.use-case.service';
import { UpdateBrandUseCase } from './application/update-brand.use-case.service';
import { DeleteBrandUseCase } from './application/delete-brand.use-case.service';
import { CreateCategoryUseCase } from './application/create-category.use-case.service';
import { FindAllCategoriesUseCase } from './application/find-all-categories.use-case.service';
import { FindOneCategoryUseCase } from './application/find-one-category.use-case.service';
import { UpdateCategoryUseCase } from './application/update-category.use-case.service';
import { DeleteCategoryUseCase } from './application/delete-category.use-case.service';
import { CreateProductUseCase } from './application/create-product.use-case.service';
import { FindAllProductsUseCase } from './application/find-all-products.use-case.service';
import { FindOneProductUseCase } from './application/find-one-product.use-case.service';
import { UpdateProductUseCase } from './application/update-product.use-case.service';
import { DeleteProductUseCase } from './application/delete-product.use-case.service';
import { BRANDS_SERVICE_PORT } from './domain/ports/brand.port';
import { CATEGORIES_SERVICE_PORT } from './domain/ports/category.port';
import { PRODUCTS_SERVICE_PORT } from './domain/ports/product.port';
import { BrandsController } from './infrastructure/adapters/in/v1/controllers/brands.controller';
import { CategoriesController } from './infrastructure/adapters/in/v1/controllers/categories.controller';
import { ProductsController } from './infrastructure/adapters/in/v1/controllers/products.controller';
import { BrandsService } from './infrastructure/adapters/in/v1/services/brands.service';
import { CategoriesService } from './infrastructure/adapters/in/v1/services/categories.service';
import { ProductsService } from './infrastructure/adapters/in/v1/services/products.service';
import { PRISMA_SERVICE_PORT } from './domain/ports/prisma-service.port';
import { PrismaService } from './infrastructure/prisma/prisma.service';

@Module({
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [
    CreateBrandUseCase,
    FindAllBrandsUseCase,
    FindOneBrandUseCase,
    UpdateBrandUseCase,
    DeleteBrandUseCase,
    CreateCategoryUseCase,
    FindAllCategoriesUseCase,
    FindOneCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
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
    {
      provide: PRISMA_SERVICE_PORT,
      useClass: PrismaService,
    },
  ],
  exports: [
    CreateBrandUseCase,
    FindAllBrandsUseCase,
    FindOneBrandUseCase,
    UpdateBrandUseCase,
    DeleteBrandUseCase,
    CreateCategoryUseCase,
    FindAllCategoriesUseCase,
    FindOneCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    FindAllProductsUseCase,
    PRISMA_SERVICE_PORT,
  ],
})
export class ProductsModule {}
