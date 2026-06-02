import { Test, TestingModule } from '@nestjs/testing';
import { BRANDS_PRISMA_PORT } from '@products/domain/ports/brands-prisma.port';
import { CreateBrandCommand } from '@products/application/commands';
import { CreateBrandV2UseCase } from './create-brand-v2.use-case.service';

describe('CreateBrandV2UseCase', () => {
  let useCase: CreateBrandV2UseCase;
  let port: { create: jest.Mock };

  beforeEach(async () => {
    port = { create: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateBrandV2UseCase, { provide: BRANDS_PRISMA_PORT, useValue: port }],
    }).compile();
    useCase = module.get(CreateBrandV2UseCase);
  });

  it('should delegate create to the prisma adapter', async () => {
    const dto = { name: 'Brand', image: 'img' };
    const command = new CreateBrandCommand(dto);
    const expected = { id: 1, ...dto };
    port.create.mockResolvedValue(expected);
    await expect(useCase.execute(command)).resolves.toEqual(expected);
    expect(port.create).toHaveBeenCalledWith(command);
  });
});
