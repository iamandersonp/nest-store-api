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
import { CreateBrandV2UseCase } from './application/create-brand-v2.use-case.service';
import { GetAllBrandsV2UseCase } from './application/get-all-brands-v2.use-case.service';
import { GetBrandV2UseCase } from './application/get-brand-v2.use-case.service';
import { UpdateBrandV2UseCase } from './application/update-brand-v2.use-case.service';
import { DeleteBrandV2UseCase } from './application/delete-brand-v2.use-case.service';
import { CreateCategoryV2UseCase } from './application/create-category-v2.use-case.service';
import { GetAllCategoriesV2UseCase } from './application/get-all-categories-v2.use-case.service';
import { GetCategoryV2UseCase } from './application/get-category-v2.use-case.service';
import { UpdateCategoryV2UseCase } from './application/update-category-v2.use-case.service';
import { DeleteCategoryV2UseCase } from './application/delete-category-v2.use-case.service';
import { CreateProductV2UseCase } from './application/create-product-v2.use-case.service';
import { GetAllProductsV2UseCase } from './application/get-all-products-v2.use-case.service';
import { GetProductV2UseCase } from './application/get-product-v2.use-case.service';
import { UpdateProductV2UseCase } from './application/update-product-v2.use-case.service';
import { DeleteProductV2UseCase } from './application/delete-product-v2.use-case.service';
import { BRANDS_SERVICE_PORT } from './domain/ports/brand.port';
import { CATEGORIES_SERVICE_PORT } from './domain/ports/category.port';
import { PRODUCTS_SERVICE_PORT } from './domain/ports/product.port';
import { BrandsController } from './infrastructure/adapters/in/v1/controllers/brands.controller';
import { CategoriesController } from './infrastructure/adapters/in/v1/controllers/categories.controller';
import { ProductsController } from './infrastructure/adapters/in/v1/controllers/products.controller';
import { ProductsV2Controller } from './infrastructure/adapters/in/v2/controllers/products-v2.controller';
import { BrandsV2Controller } from './infrastructure/adapters/in/v2/controllers/brands-v2.controller';
import { CategoriesV2Controller } from './infrastructure/adapters/in/v2/controllers/categories-v2.controller';
import { BrandsService } from './infrastructure/adapters/in/v1/services/brands.service';
import { CategoriesService } from './infrastructure/adapters/in/v1/services/categories.service';
import { ProductsService } from './infrastructure/adapters/in/v1/services/products.service';
import { PRISMA_SERVICE_PORT } from './domain/ports/prisma-service.port';
import { PRODUCTS_PRISMA_PORT } from './domain/ports/products-prisma.port';
import { BRANDS_PRISMA_PORT } from './domain/ports/brands-prisma.port';
import { CATEGORIES_PRISMA_PORT } from './domain/ports/categories-prisma.port';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { ProductsPrismaAdapter } from './infrastructure/prisma/adapters/products-prisma.adapter.service';
import { BrandsPrismaAdapter } from './infrastructure/prisma/adapters/brands-prisma.adapter.service';
import { CategoriesPrismaAdapter } from './infrastructure/prisma/adapters/categories-prisma.adapter.service';

@Module({
  controllers: [
    ProductsController,
    BrandsController,
    CategoriesController,
    ProductsV2Controller,
    BrandsV2Controller,
    CategoriesV2Controller,
  ],
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
    CreateBrandV2UseCase,
    GetAllBrandsV2UseCase,
    GetBrandV2UseCase,
    UpdateBrandV2UseCase,
    DeleteBrandV2UseCase,
    CreateCategoryV2UseCase,
    GetAllCategoriesV2UseCase,
    GetCategoryV2UseCase,
    UpdateCategoryV2UseCase,
    DeleteCategoryV2UseCase,
    CreateProductV2UseCase,
    GetAllProductsV2UseCase,
    GetProductV2UseCase,
    UpdateProductV2UseCase,
    DeleteProductV2UseCase,
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
    {
      provide: PRODUCTS_PRISMA_PORT,
      useClass: ProductsPrismaAdapter,
    },
    {
      provide: BRANDS_PRISMA_PORT,
      useClass: BrandsPrismaAdapter,
    },
    {
      provide: CATEGORIES_PRISMA_PORT,
      useClass: CategoriesPrismaAdapter,
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
    CreateProductUseCase,
    FindAllProductsUseCase,
    FindOneProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    PRISMA_SERVICE_PORT,
    PRODUCTS_PRISMA_PORT,
    BRANDS_PRISMA_PORT,
    CATEGORIES_PRISMA_PORT,
  ],
})
export class ProductsModule {}
