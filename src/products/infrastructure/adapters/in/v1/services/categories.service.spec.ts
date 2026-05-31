import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from '../dtos/categories.dto';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', () => {
      const result = service.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
    });
  });

  describe('findOne', () => {
    it('should return a single category by id', () => {
      const category = service.findOne(1);
      expect(category).toBeDefined();
      expect(category.id).toBe(1);
      expect(category.name).toBe('Category 1');
    });

    it('should throw a NotFoundException if category not found', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
      expect(() => service.findOne(999)).toThrow('category 999 not Found');
    });
  });

  describe('create', () => {
    it('should create a new category and return it', () => {
      const payload: CreateCategoryDto = {
        name: 'New Category',
      };
      const newCategory = service.create(payload);
      expect(newCategory).toBeDefined();
      expect(newCategory.id).toBe(2);
      expect(newCategory.name).toBe('New Category');

      // Verify it was added
      const allCategories = service.findAll();
      expect(allCategories).toHaveLength(2);
    });
  });

  describe('update', () => {
    it('should update a category and return the updated category', () => {
      const payload = { name: 'Updated Category 1' };
      const updatedCategory = service.update(1, payload);
      expect(updatedCategory).toBeDefined();
      expect(updatedCategory.name).toBe('Updated Category 1');

      // Verify the value was actually updated in the store
      const category = service.findOne(1);
      expect(category.name).toBe('Updated Category 1');
    });

    it('should throw a NotFoundException if category to update does not exist', () => {
      expect(() => service.update(999, { name: 'Non-existent' })).toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a category successfully', () => {
      const initialCount = service.findAll().length;
      service.delete(1);
      const allCategories = service.findAll();
      expect(allCategories).toHaveLength(initialCount - 1);
      expect(() => service.findOne(1)).toThrow(NotFoundException);
    });

    it('should throw a NotFoundException if category to delete does not exist', () => {
      expect(() => service.delete(999)).toThrow(NotFoundException);
    });
  });
});
