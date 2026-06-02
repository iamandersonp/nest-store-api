import { Test, TestingModule } from '@nestjs/testing';
import { BRANDS_PRISMA_PORT } from '@products/domain/ports/brands-prisma.port';
import { GetAllBrandsV2UseCase } from './get-all-brands-v2.use-case.service';

describe('GetAllBrandsV2UseCase', () => {
  let useCase: GetAllBrandsV2UseCase;
  let port: { findAll: jest.Mock };

  beforeEach(async () => {
    port = { findAll: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllBrandsV2UseCase, { provide: BRANDS_PRISMA_PORT, useValue: port }],
    }).compile();
    useCase = module.get(GetAllBrandsV2UseCase);
  });

  it('should delegate findAll to the prisma adapter', async () => {
    const expected = [{ id: 1, name: 'Brand', image: 'img' }];
    port.findAll.mockResolvedValue(expected);
    await expect(useCase.execute()).resolves.toEqual(expected);
    expect(port.findAll).toHaveBeenCalledWith();
  });
});
