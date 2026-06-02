import { Test, TestingModule } from '@nestjs/testing';
import { BRANDS_SERVICE_PORT } from '@products/domain/ports/brand.port';
import { FindAllBrandsUseCase } from './find-all-brands.use-case.service';

describe('FindAllBrandsUseCase', () => {
  let useCase: FindAllBrandsUseCase;
  let port: { findAll: jest.Mock };

  beforeEach(async () => {
    port = { findAll: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllBrandsUseCase, { provide: BRANDS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(FindAllBrandsUseCase);
  });

  it('should delegate findAll to the port', async () => {
    const expected = [{ id: 1, name: 'Brand', image: 'img' }];
    port.findAll.mockResolvedValue(expected);
    await expect(useCase.execute()).resolves.toEqual(expected);
    expect(port.findAll).toHaveBeenCalledWith();
  });
});
