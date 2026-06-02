import { Test, TestingModule } from '@nestjs/testing';
import { BRANDS_SERVICE_PORT } from '@products/domain/ports/brand.port';
import { FindOneBrandUseCase } from './find-one-brand.use-case.service';

describe('FindOneBrandUseCase', () => {
  let useCase: FindOneBrandUseCase;
  let port: { findOne: jest.Mock };

  beforeEach(async () => {
    port = { findOne: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindOneBrandUseCase, { provide: BRANDS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(FindOneBrandUseCase);
  });

  it('should delegate findOne to the port', async () => {
    const expected = { id: 1, name: 'Brand', image: 'img' };
    port.findOne.mockResolvedValue(expected);
    await expect(useCase.execute(1)).resolves.toEqual(expected);
    expect(port.findOne).toHaveBeenCalledWith(1);
  });
});
