import { Test, TestingModule } from '@nestjs/testing';
import { BRANDS_SERVICE_PORT } from '@products/domain/ports/brand.port';
import { UpdateBrandCommand } from '@products/application/commands';
import { UpdateBrandUseCase } from './update-brand.use-case.service';

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
    const command = new UpdateBrandCommand({ name: 'Updated' });
    const expected = { id: 1, name: 'Updated', image: 'img' };
    port.update.mockResolvedValue(expected);
    await expect(useCase.execute(1, command)).resolves.toEqual(expected);
    expect(port.update).toHaveBeenCalledWith(1, command);
  });
});
