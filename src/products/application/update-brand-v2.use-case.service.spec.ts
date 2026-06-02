import { Test, TestingModule } from '@nestjs/testing';
import { BRANDS_PRISMA_PORT } from '@products/domain/ports/brands-prisma.port';
import { UpdateBrandCommand } from '@products/application/commands';
import { UpdateBrandV2UseCase } from './update-brand-v2.use-case.service';

describe('UpdateBrandV2UseCase', () => {
  let useCase: UpdateBrandV2UseCase;
  let port: { update: jest.Mock };

  beforeEach(async () => {
    port = { update: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateBrandV2UseCase, { provide: BRANDS_PRISMA_PORT, useValue: port }],
    }).compile();
    useCase = module.get(UpdateBrandV2UseCase);
  });

  it('should delegate update to the prisma adapter', async () => {
    const command = new UpdateBrandCommand({ name: 'Updated' });
    const expected = { id: 1, name: 'Updated', image: 'img' };
    port.update.mockResolvedValue(expected);
    await expect(useCase.execute(1, command)).resolves.toEqual(expected);
    expect(port.update).toHaveBeenCalledWith(1, command);
  });
});
