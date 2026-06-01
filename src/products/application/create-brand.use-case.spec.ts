import { Test, TestingModule } from '@nestjs/testing';
import { BRANDS_SERVICE_PORT } from '@products/domain/ports/brand.port';
import { CreateBrandUseCase } from './create-brand.use-case';

describe('CreateBrandUseCase', () => {
  let useCase: CreateBrandUseCase;
  let port: { create: jest.Mock };

  beforeEach(async () => {
    port = { create: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateBrandUseCase, { provide: BRANDS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(CreateBrandUseCase);
  });

  it('should delegate create to the port', async () => {
    const payload = { name: 'Brand', image: 'img' };
    const expected = { id: 1, ...payload };
    port.create.mockResolvedValue(expected);
    await expect(useCase.execute(payload)).resolves.toEqual(expected);
    expect(port.create).toHaveBeenCalledWith(payload);
  });
});
