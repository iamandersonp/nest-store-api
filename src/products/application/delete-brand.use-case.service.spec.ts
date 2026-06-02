import { Test, TestingModule } from '@nestjs/testing';
import { BRANDS_SERVICE_PORT } from '@products/domain/ports/brand.port';
import { DeleteBrandUseCase } from './delete-brand.use-case.service';

describe('DeleteBrandUseCase', () => {
  let useCase: DeleteBrandUseCase;
  let port: { delete: jest.Mock };

  beforeEach(async () => {
    port = { delete: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteBrandUseCase, { provide: BRANDS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(DeleteBrandUseCase);
  });

  it('should delegate delete to the port', async () => {
    port.delete.mockResolvedValue(undefined);
    await expect(useCase.execute(1)).resolves.toBeUndefined();
    expect(port.delete).toHaveBeenCalledWith(1);
  });
});
