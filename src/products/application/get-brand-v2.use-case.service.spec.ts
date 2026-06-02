import { Test, TestingModule } from '@nestjs/testing';
import { BRANDS_PRISMA_PORT } from '@products/domain/ports/brands-prisma.port';
import { GetBrandV2UseCase } from './get-brand-v2.use-case.service';

describe('GetBrandV2UseCase', () => {
  let useCase: GetBrandV2UseCase;
  let port: { findOne: jest.Mock };

  beforeEach(async () => {
    port = { findOne: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetBrandV2UseCase, { provide: BRANDS_PRISMA_PORT, useValue: port }],
    }).compile();
    useCase = module.get(GetBrandV2UseCase);
  });

  it('should delegate findOne to the prisma adapter', async () => {
    const expected = { id: 1, name: 'Brand', image: 'img' };
    port.findOne.mockResolvedValue(expected);
    await expect(useCase.execute(1)).resolves.toEqual(expected);
    expect(port.findOne).toHaveBeenCalledWith(1);
  });
});
