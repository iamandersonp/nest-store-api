import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

describe('BrandsService', () => {
  let service: BrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandsService],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of brands', () => {
      const result = service.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
    });
  });

  describe('findOne', () => {
    it('should return a single brand by id', () => {
      const brand = service.findOne(1);
      expect(brand).toBeDefined();
      expect(brand.id).toBe(1);
      expect(brand.name).toBe('Brand 1');
    });

    it('should throw a NotFoundException if brand not found', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
      expect(() => service.findOne(999)).toThrow('Brand 999 not Found');
    });
  });

  describe('create', () => {
    it('should create a new brand and return it', () => {
      const payload: CreateBrandDto = {
        name: 'New Brand',
        image: 'http://image.com/brand.png',
      };
      const newBrand = service.create(payload);
      expect(newBrand).toBeDefined();
      expect(newBrand.id).toBe(2);
      expect(newBrand.name).toBe('New Brand');
      expect(newBrand.image).toBe('http://image.com/brand.png');

      // Verify it was added
      const allBrands = service.findAll();
      expect(allBrands).toHaveLength(2);
    });
  });

  describe('update', () => {
    it('should update a brand and return the updated brand', () => {
      const payload: UpdateBrandDto = { name: 'Updated Brand 1' };
      const updatedBrand = service.update(1, payload);
      expect(updatedBrand).toBeDefined();
      expect(updatedBrand.name).toBe('Updated Brand 1');

      // Verify the value was actually updated in the store
      const brand = service.findOne(1);
      expect(brand.name).toBe('Updated Brand 1');
    });

    it('should throw a NotFoundException if brand to update does not exist', () => {
      expect(() => service.update(999, { name: 'Non-existent' })).toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a brand successfully', () => {
      const initialCount = service.findAll().length;
      service.delete(1);
      const allBrands = service.findAll();
      expect(allBrands).toHaveLength(initialCount - 1);
      expect(() => service.findOne(1)).toThrow(NotFoundException);
    });

    it('should throw a NotFoundException if brand to delete does not exist', () => {
      expect(() => service.delete(999)).toThrow(NotFoundException);
    });
  });
});
