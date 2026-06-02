import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesPrismaAdapter } from './categories-prisma.adapter.service';
import { PRISMA_SERVICE_PORT } from '@products/domain/ports/prisma-service.port';
import { CategoryNotFoundError } from '@products/domain/errors/category-not-found.error';
import type { Category } from '@products/domain/models/category.entity';
import { CreateCategoryCommand, UpdateCategoryCommand } from '@products/application/commands';

describe('CategoriesPrismaAdapter', () => {
  let adapter: CategoriesPrismaAdapter;
  let mockPrismaClient: {
    category: {
      findMany: jest.Mock;
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  const mockCategory: Category = {
    id: 1,
    name: 'Test Category',
  };

  beforeEach(async () => {
    mockPrismaClient = {
      category: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesPrismaAdapter,
        {
          provide: PRISMA_SERVICE_PORT,
          useValue: { prisma: mockPrismaClient },
        },
      ],
    }).compile();

    adapter = module.get<CategoriesPrismaAdapter>(CategoriesPrismaAdapter);
  });

  describe('findAll', () => {
    it('should return all categories from the database', async () => {
      const categories: Category[] = [mockCategory, { id: 2, name: 'Category 2' }];
      mockPrismaClient.category.findMany.mockResolvedValue(categories);

      const result = await adapter.findAll();

      expect(mockPrismaClient.category.findMany).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Test Category');
      expect(result[1].name).toBe('Category 2');
    });

    it('should return an empty array when no categories exist', async () => {
      mockPrismaClient.category.findMany.mockResolvedValue([]);

      const result = await adapter.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a category by its id', async () => {
      mockPrismaClient.category.findUnique.mockResolvedValue(mockCategory);

      const result = await adapter.findOne(1);

      expect(mockPrismaClient.category.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockCategory);
    });

    it('should throw CategoryNotFoundError when the category does not exist', async () => {
      mockPrismaClient.category.findUnique.mockResolvedValue(null);

      await expect(adapter.findOne(999)).rejects.toThrow(CategoryNotFoundError);
      await expect(adapter.findOne(999)).rejects.toThrow('Category with id=999 not found.');
    });
  });

  describe('create', () => {
    it('should create a new category and return it', async () => {
      const command = new CreateCategoryCommand({ name: 'New Category' });
      const createdCategory: Category = { id: 2, ...command };
      mockPrismaClient.category.create.mockResolvedValue(createdCategory);

      const result = await adapter.create(command);

      expect(mockPrismaClient.category.create).toHaveBeenCalledWith({
        data: command,
      });
      expect(result.name).toBe('New Category');
    });

    it('should create a category with different name', async () => {
      const command = new CreateCategoryCommand({ name: 'Electronics' });
      const createdCategory: Category = { id: 3, ...command };
      mockPrismaClient.category.create.mockResolvedValue(createdCategory);

      const result = await adapter.create(command);

      expect(mockPrismaClient.category.create).toHaveBeenCalledWith({
        data: command,
      });
      expect(result.id).toBe(3);
      expect(result.name).toBe('Electronics');
    });
  });

  describe('update', () => {
    it('should update a category and return the updated category', async () => {
      const command = new UpdateCategoryCommand({
        name: 'Updated Category',
      });
      const updatedCategory: Category = { ...mockCategory, name: 'Updated Category' };

      mockPrismaClient.category.findUnique.mockResolvedValue(mockCategory);
      mockPrismaClient.category.update.mockResolvedValue(updatedCategory);

      const result = await adapter.update(1, command);

      expect(mockPrismaClient.category.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockPrismaClient.category.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: command,
      });
      expect(result.name).toBe('Updated Category');
    });

    it('should throw CategoryNotFoundError when the category to update does not exist', async () => {
      mockPrismaClient.category.findUnique.mockResolvedValue(null);

      const command = new UpdateCategoryCommand({
        name: 'Non-existent',
      });

      await expect(adapter.update(999, command)).rejects.toThrow(CategoryNotFoundError);
      expect(mockPrismaClient.category.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a category by its id', async () => {
      mockPrismaClient.category.findUnique.mockResolvedValue(mockCategory);
      mockPrismaClient.category.delete.mockResolvedValue(mockCategory);

      await adapter.delete(1);

      expect(mockPrismaClient.category.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw CategoryNotFoundError when the category to delete does not exist', async () => {
      mockPrismaClient.category.findUnique.mockResolvedValue(null);

      await expect(adapter.delete(999)).rejects.toThrow(CategoryNotFoundError);
      expect(mockPrismaClient.category.delete).not.toHaveBeenCalled();
    });
  });
});
