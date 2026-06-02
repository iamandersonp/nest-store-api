import { Test, TestingModule } from '@nestjs/testing';
import { BrandsPrismaAdapter } from './brands-prisma.adapter.service';
import { PRISMA_SERVICE_PORT } from '@products/domain/ports/prisma-service.port';
import { BrandNotFoundError } from '@products/domain/errors/brand-not-found.error';
import type { Brand } from '@products/domain/models/brand.entity';
import { CreateBrandCommand, UpdateBrandCommand } from '@products/application/commands';

describe('BrandsPrismaAdapter', () => {
  let adapter: BrandsPrismaAdapter;
  let mockPrismaClient: {
    brand: {
      findMany: jest.Mock;
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  const mockBrand: Brand = {
    id: 1,
    name: 'Test Brand',
    image: 'https://example.com/brand.png',
  };

  beforeEach(async () => {
    mockPrismaClient = {
      brand: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsPrismaAdapter,
        {
          provide: PRISMA_SERVICE_PORT,
          useValue: { prisma: mockPrismaClient },
        },
      ],
    }).compile();

    adapter = module.get<BrandsPrismaAdapter>(BrandsPrismaAdapter);
  });

  describe('findAll', () => {
    it('should return all brands from the database', async () => {
      const brands: Brand[] = [mockBrand, { ...mockBrand, id: 2, name: 'Brand 2' }];
      mockPrismaClient.brand.findMany.mockResolvedValue(brands);

      const result = await adapter.findAll();

      expect(mockPrismaClient.brand.findMany).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Test Brand');
      expect(result[1].name).toBe('Brand 2');
    });

    it('should return an empty array when no brands exist', async () => {
      mockPrismaClient.brand.findMany.mockResolvedValue([]);

      const result = await adapter.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a brand by its id', async () => {
      mockPrismaClient.brand.findUnique.mockResolvedValue(mockBrand);

      const result = await adapter.findOne(1);

      expect(mockPrismaClient.brand.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockBrand);
    });

    it('should throw BrandNotFoundError when the brand does not exist', async () => {
      mockPrismaClient.brand.findUnique.mockResolvedValue(null);

      await expect(adapter.findOne(999)).rejects.toThrow(BrandNotFoundError);
      await expect(adapter.findOne(999)).rejects.toThrow('Brand with id=999 not found.');
    });
  });

  describe('create', () => {
    it('should create a new brand and return it', async () => {
      const command = new CreateBrandCommand({
        name: 'New Brand',
        image: 'https://example.com/new-brand.png',
      });
      const createdBrand: Brand = { id: 2, ...command };
      mockPrismaClient.brand.create.mockResolvedValue(createdBrand);

      const result = await adapter.create(command);

      expect(mockPrismaClient.brand.create).toHaveBeenCalledWith({
        data: command,
      });
      expect(result.name).toBe('New Brand');
    });

    it('should create a brand with minimal data', async () => {
      const command = new CreateBrandCommand({
        name: 'Minimal Brand',
        image: '',
      });
      const createdBrand: Brand = { id: 3, ...command };
      mockPrismaClient.brand.create.mockResolvedValue(createdBrand);

      const result = await adapter.create(command);

      expect(mockPrismaClient.brand.create).toHaveBeenCalledWith({
        data: command,
      });
      expect(result.id).toBe(3);
      expect(result.name).toBe('Minimal Brand');
    });
  });

  describe('update', () => {
    it('should update a brand and return the updated brand', async () => {
      const command = new UpdateBrandCommand({ name: 'Updated Brand' });
      const updatedBrand: Brand = { ...mockBrand, name: 'Updated Brand' };

      mockPrismaClient.brand.findUnique.mockResolvedValue(mockBrand);
      mockPrismaClient.brand.update.mockResolvedValue(updatedBrand);

      const result = await adapter.update(1, command);

      expect(mockPrismaClient.brand.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockPrismaClient.brand.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: command,
      });
      expect(result.name).toBe('Updated Brand');
    });

    it('should throw BrandNotFoundError when the brand to update does not exist', async () => {
      mockPrismaClient.brand.findUnique.mockResolvedValue(null);

      const command = new UpdateBrandCommand({ name: 'Non-existent' });

      await expect(adapter.update(999, command)).rejects.toThrow(BrandNotFoundError);
      expect(mockPrismaClient.brand.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a brand by its id', async () => {
      mockPrismaClient.brand.findUnique.mockResolvedValue(mockBrand);
      mockPrismaClient.brand.delete.mockResolvedValue(mockBrand);

      await adapter.delete(1);

      expect(mockPrismaClient.brand.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw BrandNotFoundError when the brand to delete does not exist', async () => {
      mockPrismaClient.brand.findUnique.mockResolvedValue(null);

      await expect(adapter.delete(999)).rejects.toThrow(BrandNotFoundError);
      expect(mockPrismaClient.brand.delete).not.toHaveBeenCalled();
    });
  });
});
