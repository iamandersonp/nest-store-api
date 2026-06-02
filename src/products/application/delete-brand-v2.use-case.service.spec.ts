import { Test, TestingModule } from '@nestjs/testing';
import { BRANDS_PRISMA_PORT } from '@products/domain/ports/brands-prisma.port';
import { DeleteBrandV2UseCase } from './delete-brand-v2.use-case.service';

describe('DeleteBrandV2UseCase', () => {
  let useCase: DeleteBrandV2UseCase;
  let port: { delete: jest.Mock };

  beforeEach(async () => {
    port = { delete: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteBrandV2UseCase, { provide: BRANDS_PRISMA_PORT, useValue: port }],
    }).compile();
    useCase = module.get(DeleteBrandV2UseCase);
  });

  it('should delegate delete to the prisma adapter', async () => {
    port.delete.mockResolvedValue(undefined);
    await expect(useCase.execute(1)).resolves.toBeUndefined();
    expect(port.delete).toHaveBeenCalledWith(1);
  });
});
