import { Test, TestingModule } from '@nestjs/testing';
import { ProductsPrismaAdapter } from './products-prisma.adapter.service';
import { PRISMA_SERVICE_PORT } from '@products/domain/ports/prisma-service.port';
import { ProductNotFoundError } from '@products/domain/errors/product-not-found.error';
import type { Product } from '@products/domain/models/product.entity';
import { CreateProductCommand, UpdateProductCommand } from '@products/application/commands';

describe('ProductsPrismaAdapter', () => {
  let adapter: ProductsPrismaAdapter;
  let mockPrismaClient: {
    product: {
      findMany: jest.Mock;
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'A test product',
    price: 100,
    stock: 10,
    image: 'https://example.com/product.png',
  };

  beforeEach(async () => {
    mockPrismaClient = {
      product: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsPrismaAdapter,
        {
          provide: PRISMA_SERVICE_PORT,
          useValue: { prisma: mockPrismaClient },
        },
      ],
    }).compile();

    adapter = module.get<ProductsPrismaAdapter>(ProductsPrismaAdapter);
  });

  describe('findAll', () => {
    it('should return all products from the database', async () => {
      const products: Product[] = [mockProduct, { ...mockProduct, id: 2, name: 'Product 2' }];
      mockPrismaClient.product.findMany.mockResolvedValue(products);

      const result = await adapter.findAll();

      expect(mockPrismaClient.product.findMany).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Test Product');
      expect(result[1].name).toBe('Product 2');
    });

    it('should return an empty array when no products exist', async () => {
      mockPrismaClient.product.findMany.mockResolvedValue([]);

      const result = await adapter.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a product by its id', async () => {
      mockPrismaClient.product.findUnique.mockResolvedValue(mockProduct);

      const result = await adapter.findOne(1);

      expect(mockPrismaClient.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockProduct);
    });

    it('should throw ProductNotFoundError when the product does not exist', async () => {
      mockPrismaClient.product.findUnique.mockResolvedValue(null);

      await expect(adapter.findOne(999)).rejects.toThrow(ProductNotFoundError);
      await expect(adapter.findOne(999)).rejects.toThrow('Product with id=999 not found.');
    });
  });

  describe('create', () => {
    it('should create a new product and return it', async () => {
      const command = new CreateProductCommand({
        name: 'New Product',
        description: 'New description',
        price: 200,
        stock: 20,
        image: 'https://example.com/new.png',
        brandId: 1,
        categoryId: 2,
      });
      const createdProduct: Product = { ...mockProduct, ...command };
      mockPrismaClient.product.create.mockResolvedValue(createdProduct);

      const result = await adapter.create(command);

      expect(mockPrismaClient.product.create).toHaveBeenCalledWith({
        data: command,
      });
      expect(result.name).toBe('New Product');
      expect(result.price).toBe(200);
    });

    it('should create a product with minimal data', async () => {
      const command = new CreateProductCommand({
        name: 'Minimal',
        description: 'Minimal desc',
        price: 50,
        stock: 5,
        image: 'https://example.com/min.png',
        brandId: 1,
        categoryId: 1,
      });
      const createdProduct: Product = { id: 3, ...command };
      mockPrismaClient.product.create.mockResolvedValue(createdProduct);

      const result = await adapter.create(command);

      expect(mockPrismaClient.product.create).toHaveBeenCalledWith({
        data: command,
      });
      expect(result.id).toBe(3);
      expect(result.name).toBe('Minimal');
      expect(result.stock).toBe(5);
    });
  });

  describe('update', () => {
    it('should update a product and return the updated product', async () => {
      const command = new UpdateProductCommand({ name: 'Updated Name' });
      const updatedProduct: Product = { ...mockProduct, name: 'Updated Name' };

      mockPrismaClient.product.findUnique.mockResolvedValue(mockProduct);
      mockPrismaClient.product.update.mockResolvedValue(updatedProduct);

      const result = await adapter.update(1, command);

      expect(mockPrismaClient.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockPrismaClient.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: command,
      });
      expect(result.name).toBe('Updated Name');
    });

    it('should throw ProductNotFoundError when the product to update does not exist', async () => {
      mockPrismaClient.product.findUnique.mockResolvedValue(null);

      const command = new UpdateProductCommand({ name: 'Non-existent' });

      await expect(adapter.update(999, command)).rejects.toThrow(ProductNotFoundError);
      expect(mockPrismaClient.product.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a product by its id', async () => {
      mockPrismaClient.product.findUnique.mockResolvedValue(mockProduct);
      mockPrismaClient.product.delete.mockResolvedValue(mockProduct);

      await adapter.delete(1);

      expect(mockPrismaClient.product.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw ProductNotFoundError when the product to delete does not exist', async () => {
      mockPrismaClient.product.findUnique.mockResolvedValue(null);

      await expect(adapter.delete(999)).rejects.toThrow(ProductNotFoundError);
      expect(mockPrismaClient.product.delete).not.toHaveBeenCalled();
    });
  });
});
