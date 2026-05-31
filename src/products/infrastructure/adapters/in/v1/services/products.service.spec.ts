import { Test, TestingModule } from '@nestjs/testing';
import { ProductNotFoundError } from '@products/domain/errors/product-not-found.error';
import { ProductsService } from './products.service';
import { CreateProductsDto } from '../dtos/products.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', () => {
      const result = service.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
    });
  });

  describe('findOne', () => {
    it('should return a single product by id', () => {
      const product = service.findOne(1);
      expect(product).toBeDefined();
      expect(product.id).toBe(1);
      expect(product.name).toBe('Product 1');
    });

    it('should throw a NotFoundException if product not found', () => {
      expect(() => service.findOne(999)).toThrow(ProductNotFoundError);
    });
  });

  describe('create', () => {
    it('should create a new product and return it', () => {
      const payload: CreateProductsDto = {
        name: 'New Product',
        description: 'New Description',
        price: 2000,
        stock: 50,
        image: 'http://image.com/product.png',
      };
      const newProduct = service.create(payload);
      expect(newProduct).toBeDefined();
      expect(newProduct.id).toBe(2);
      expect(newProduct.name).toBe('New Product');
      expect(newProduct.description).toBe('New Description');
      expect(newProduct.price).toBe(2000);
      expect(newProduct.stock).toBe(50);
      expect(newProduct.image).toBe('http://image.com/product.png');

      // Verify it was added
      const allProducts = service.findAll();
      expect(allProducts).toHaveLength(2);
    });
  });

  describe('update', () => {
    it('should update a product and return the updated product', () => {
      const payload = { name: 'Updated Product 1', price: 1200 };
      const updatedProduct = service.update(1, payload);
      expect(updatedProduct).toBeDefined();
      expect(updatedProduct.name).toBe('Updated Product 1');
      expect(updatedProduct.price).toBe(1200);

      // Verify the value was actually updated in the store
      const product = service.findOne(1);
      expect(product.name).toBe('Updated Product 1');
      expect(product.price).toBe(1200);
    });

    it('should throw a NotFoundException if product to update does not exist', () => {
      expect(() => service.update(999, { name: 'Non-existent' })).toThrow(ProductNotFoundError);
    });
  });

  describe('delete', () => {
    it('should delete a product successfully', () => {
      const initialCount = service.findAll().length;
      service.delete(1);
      const allProducts = service.findAll();
      expect(allProducts).toHaveLength(initialCount - 1);
      expect(() => service.findOne(1)).toThrow(ProductNotFoundError);
    });

    it('should throw a NotFoundException if product to delete does not exist', () => {
      expect(() => service.delete(999)).toThrow(ProductNotFoundError);
    });
  });
});
