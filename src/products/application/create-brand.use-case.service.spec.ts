import { Test, TestingModule } from '@nestjs/testing';
import { BRANDS_SERVICE_PORT } from '@products/domain/ports/brand.port';
import { CreateBrandCommand } from '@products/application/commands';
import { CreateBrandUseCase } from './create-brand.use-case.service';

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
    const dto = { name: 'Brand', image: 'img' };
    const command = new CreateBrandCommand(dto);
    const expected = { id: 1, ...dto };
    port.create.mockResolvedValue(expected);
    await expect(useCase.execute(command)).resolves.toEqual(expected);
    expect(port.create).toHaveBeenCalledWith(command);
  });
});
