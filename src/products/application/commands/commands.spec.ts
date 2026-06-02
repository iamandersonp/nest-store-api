import {
  CreateProductCommand,
  UpdateProductCommand,
  CreateBrandCommand,
  UpdateBrandCommand,
  CreateCategoryCommand,
  UpdateCategoryCommand,
} from './index';

describe('Commands', () => {
  describe('CreateProductCommand', () => {
    it('should create with all readonly properties', () => {
      const props = {
        name: 'Laptop',
        description: 'A powerful laptop',
        price: 1500,
        stock: 10,
        image: 'https://example.com/laptop.png',
        brandId: 1,
        categoryId: 2,
      };
      const command = new CreateProductCommand(props);

      expect(command).toBeInstanceOf(CreateProductCommand);
      expect(command.name).toBe('Laptop');
      expect(command.description).toBe('A powerful laptop');
      expect(command.price).toBe(1500);
      expect(command.stock).toBe(10);
      expect(command.image).toBe('https://example.com/laptop.png');
      expect(command.brandId).toBe(1);
      expect(command.categoryId).toBe(2);
    });

    it('should make properties readonly at runtime', () => {
      const command = new CreateProductCommand({
        name: 'Test',
        description: 'Desc',
        price: 100,
        stock: 5,
        image: 'https://example.com/img.png',
        brandId: 1,
        categoryId: 2,
      });

      expect(() => {
        (command as unknown as Record<string, unknown>).name = 'Changed';
      }).toThrow();
    });

    it('should create unique instances with different values', () => {
      const cmd1 = new CreateProductCommand({
        name: 'Product A',
        description: 'Desc A',
        price: 100,
        stock: 5,
        image: 'https://example.com/a.png',
        brandId: 1,
        categoryId: 2,
      });
      const cmd2 = new CreateProductCommand({
        name: 'Product B',
        description: 'Desc B',
        price: 200,
        stock: 10,
        image: 'https://example.com/b.png',
        brandId: 3,
        categoryId: 4,
      });

      expect(cmd1.name).toBe('Product A');
      expect(cmd2.name).toBe('Product B');
      expect(cmd1).not.toBe(cmd2);
    });
  });

  describe('UpdateProductCommand', () => {
    it('should create with partial fields', () => {
      const command = new UpdateProductCommand({ name: 'Updated Name' });

      expect(command).toBeInstanceOf(UpdateProductCommand);
      expect(command.name).toBe('Updated Name');
      expect(command.description).toBeUndefined();
      expect(command.price).toBeUndefined();
      expect(command.stock).toBeUndefined();
      expect(command.image).toBeUndefined();
      expect(command.brandId).toBeUndefined();
      expect(command.categoryId).toBeUndefined();
    });

    it('should create with all fields', () => {
      const props = {
        name: 'Updated',
        description: 'Updated desc',
        price: 2000,
        stock: 20,
        image: 'https://example.com/new.png',
        brandId: 2,
        categoryId: 3,
      };
      const command = new UpdateProductCommand(props);

      expect(command.name).toBe('Updated');
      expect(command.description).toBe('Updated desc');
      expect(command.price).toBe(2000);
      expect(command.stock).toBe(20);
      expect(command.image).toBe('https://example.com/new.png');
      expect(command.brandId).toBe(2);
      expect(command.categoryId).toBe(3);
    });

    it('should create with empty props', () => {
      const command = new UpdateProductCommand({});

      expect(command.name).toBeUndefined();
      expect(command.description).toBeUndefined();
      expect(command.price).toBeUndefined();
      expect(command.stock).toBeUndefined();
      expect(command.image).toBeUndefined();
      expect(command.brandId).toBeUndefined();
      expect(command.categoryId).toBeUndefined();
    });
  });

  describe('CreateBrandCommand', () => {
    it('should create with all readonly properties', () => {
      const props = { name: 'Nike', image: 'https://example.com/nike.png' };
      const command = new CreateBrandCommand(props);

      expect(command).toBeInstanceOf(CreateBrandCommand);
      expect(command.name).toBe('Nike');
      expect(command.image).toBe('https://example.com/nike.png');
    });

    it('should make properties readonly at runtime', () => {
      const command = new CreateBrandCommand({
        name: 'Adidas',
        image: 'https://example.com/adidas.png',
      });

      expect(() => {
        (command as unknown as Record<string, unknown>).name = 'Changed';
      }).toThrow();
    });
  });

  describe('UpdateBrandCommand', () => {
    it('should create with partial fields', () => {
      const command = new UpdateBrandCommand({ name: 'Updated Brand' });

      expect(command.name).toBe('Updated Brand');
      expect(command.image).toBeUndefined();
    });

    it('should create with all fields', () => {
      const command = new UpdateBrandCommand({
        name: 'New Name',
        image: 'https://example.com/new.png',
      });

      expect(command.name).toBe('New Name');
      expect(command.image).toBe('https://example.com/new.png');
    });

    it('should create with empty props', () => {
      const command = new UpdateBrandCommand({});

      expect(command.name).toBeUndefined();
      expect(command.image).toBeUndefined();
    });
  });

  describe('CreateCategoryCommand', () => {
    it('should create with readonly name', () => {
      const command = new CreateCategoryCommand({ name: 'Electronics' });

      expect(command).toBeInstanceOf(CreateCategoryCommand);
      expect(command.name).toBe('Electronics');
    });

    it('should make name readonly at runtime', () => {
      const command = new CreateCategoryCommand({ name: 'Books' });

      expect(() => {
        (command as unknown as Record<string, unknown>).name = 'Changed';
      }).toThrow();
    });
  });

  describe('UpdateCategoryCommand', () => {
    it('should create with name', () => {
      const command = new UpdateCategoryCommand({ name: 'Updated Category' });

      expect(command.name).toBe('Updated Category');
    });

    it('should create with empty props', () => {
      const command = new UpdateCategoryCommand({});

      expect(command.name).toBeUndefined();
    });
  });
});
