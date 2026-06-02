import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import request from 'supertest';
import { ConfigModule } from '@nestjs/config';

import { ProductsModule } from '../src/products/products.module';
import { PRISMA_SERVICE_PORT } from '../src/products/domain/ports/prisma-service.port';
import { PRODUCTS_PRISMA_PORT } from '../src/products/domain/ports/products-prisma.port';
import { BRANDS_PRISMA_PORT } from '../src/products/domain/ports/brands-prisma.port';
import { CATEGORIES_PRISMA_PORT } from '../src/products/domain/ports/categories-prisma.port';
import type { Product } from '../src/products/domain/models/product.entity';
import type { Brand } from '../src/products/domain/models/brand.entity';
import type { Category } from '../src/products/domain/models/category.entity';

describe('Products V2 (e2e)', () => {
  let app: INestApplication;

  const mockProduct: Product = {
    id: 1,
    name: 'Test',
    description: 'Desc',
    price: 10,
    stock: 5,
    image: 'http://img.com/pic.jpg',
  };
  const mockBrand: Brand = { id: 1, name: 'Test Brand', image: 'http://img.com/brand.jpg' };
  const mockCategory: Category = { id: 1, name: 'Test Category' };

  const mockProductsAdapter = {
    findAll: jest.fn().mockResolvedValue([mockProduct]),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    create: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue(mockProduct),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  const mockBrandsAdapter = {
    findAll: jest.fn().mockResolvedValue([mockBrand]),
    findOne: jest.fn().mockResolvedValue(mockBrand),
    create: jest.fn().mockResolvedValue(mockBrand),
    update: jest.fn().mockResolvedValue(mockBrand),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  const mockCategoriesAdapter = {
    findAll: jest.fn().mockResolvedValue([mockCategory]),
    findOne: jest.fn().mockResolvedValue(mockCategory),
    create: jest.fn().mockResolvedValue(mockCategory),
    update: jest.fn().mockResolvedValue(mockCategory),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), ProductsModule],
    })
      .overrideProvider(PRODUCTS_PRISMA_PORT)
      .useValue(mockProductsAdapter)
      .overrideProvider(BRANDS_PRISMA_PORT)
      .useValue(mockBrandsAdapter)
      .overrideProvider(CATEGORIES_PRISMA_PORT)
      .useValue(mockCategoriesAdapter)
      .overrideProvider(PRISMA_SERVICE_PORT)
      .useValue({ prisma: {} })
      .compile();

    app = moduleFixture.createNestApplication();

    // Apply global pipes and versioning matching main.ts
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    app.enableVersioning({
      type: VersioningType.URI,
    });

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('/v2/products', () => {
    it('GET /v2/products returns 200 with array', async () => {
      const response = await request(app.getHttpServer()).get('/v2/products');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockProduct]);
      expect(mockProductsAdapter.findAll).toHaveBeenCalled();
    });

    it('GET /v2/products/:id returns 200 with product', async () => {
      const response = await request(app.getHttpServer()).get('/v2/products/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProduct);
      expect(mockProductsAdapter.findOne).toHaveBeenCalledWith(1);
    });

    it('POST /v2/products creates and returns 201', async () => {
      const payload = {
        name: 'New',
        description: 'D',
        price: 10,
        stock: 5,
        image: 'http://img.com/p.jpg',
      };
      const response = await request(app.getHttpServer()).post('/v2/products').send(payload);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockProduct);
      expect(mockProductsAdapter.create).toHaveBeenCalled();
    });

    it('PUT /v2/products/:id updates and returns 200', async () => {
      const payload = { name: 'Updated' };
      const response = await request(app.getHttpServer()).put('/v2/products/1').send(payload);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProduct);
    });

    it('DELETE /v2/products/:id returns 204', async () => {
      const response = await request(app.getHttpServer()).delete('/v2/products/1');
      expect(response.status).toBe(204);
      expect(mockProductsAdapter.delete).toHaveBeenCalledWith(1);
    });

    it('POST /v2/products with missing fields returns 400', async () => {
      const response = await request(app.getHttpServer()).post('/v2/products').send({});
      expect(response.status).toBe(400);
    });
  });

  describe('/v2/brands', () => {
    it('GET /v2/brands returns 200 with array', async () => {
      const response = await request(app.getHttpServer()).get('/v2/brands');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockBrand]);
    });

    it('GET /v2/brands/:id returns 200 with brand', async () => {
      const response = await request(app.getHttpServer()).get('/v2/brands/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBrand);
    });

    it('POST /v2/brands creates and returns 201', async () => {
      const payload = { name: 'New Brand', image: 'http://img.com/b.jpg' };
      const response = await request(app.getHttpServer()).post('/v2/brands').send(payload);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockBrand);
    });

    it('PUT /v2/brands/:id updates and returns 200', async () => {
      const payload = { name: 'Updated' };
      const response = await request(app.getHttpServer()).put('/v2/brands/1').send(payload);
      expect(response.status).toBe(200);
    });

    it('DELETE /v2/brands/:id returns 204', async () => {
      const response = await request(app.getHttpServer()).delete('/v2/brands/1');
      expect(response.status).toBe(204);
    });

    it('POST /v2/brands with missing fields returns 400', async () => {
      const response = await request(app.getHttpServer()).post('/v2/brands').send({});
      expect(response.status).toBe(400);
    });
  });

  describe('/v2/categories', () => {
    it('GET /v2/categories returns 200 with array', async () => {
      const response = await request(app.getHttpServer()).get('/v2/categories');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockCategory]);
    });

    it('GET /v2/categories/:id returns 200 with category', async () => {
      const response = await request(app.getHttpServer()).get('/v2/categories/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCategory);
    });

    it('POST /v2/categories creates and returns 201', async () => {
      const payload = { name: 'New Category' };
      const response = await request(app.getHttpServer()).post('/v2/categories').send(payload);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCategory);
    });

    it('PUT /v2/categories/:id updates and returns 200', async () => {
      const payload = { name: 'Updated' };
      const response = await request(app.getHttpServer()).put('/v2/categories/1').send(payload);
      expect(response.status).toBe(200);
    });

    it('DELETE /v2/categories/:id returns 204', async () => {
      const response = await request(app.getHttpServer()).delete('/v2/categories/1');
      expect(response.status).toBe(204);
    });

    it('POST /v2/categories with missing fields returns 400', async () => {
      const response = await request(app.getHttpServer()).post('/v2/categories').send({});
      expect(response.status).toBe(400);
    });
  });
});
