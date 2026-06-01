import { Test, TestingModule } from '@nestjs/testing';
import { BRANDS_SERVICE_PORT } from '@products/domain/ports/brand.port';
import { UpdateBrandUseCase } from './update-brand.use-case';

describe('UpdateBrandUseCase', () => {
  let useCase: UpdateBrandUseCase;
  let port: { update: jest.Mock };

  beforeEach(async () => {
    port = { update: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateBrandUseCase, { provide: BRANDS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(UpdateBrandUseCase);
  });

  it('should delegate update to the port', async () => {
    const payload = { name: 'Updated' };
    const expected = { id: 1, name: 'Updated', image: 'img' };
    port.update.mockResolvedValue(expected);
    await expect(useCase.execute(1, payload)).resolves.toEqual(expected);
    expect(port.update).toHaveBeenCalledWith(1, payload);
  });
});
