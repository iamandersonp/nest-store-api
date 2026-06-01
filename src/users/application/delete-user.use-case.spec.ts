import { Test, TestingModule } from '@nestjs/testing';
import { USERS_SERVICE_PORT } from '@users/domain/ports/user.port';
import { DeleteUserUseCase } from './delete-user.use-case';

describe('DeleteUserUseCase', () => {
  let useCase: DeleteUserUseCase;
  let port: { delete: jest.Mock };

  beforeEach(async () => {
    port = { delete: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteUserUseCase, { provide: USERS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(DeleteUserUseCase);
  });

  it('should delegate delete to the port', async () => {
    port.delete.mockResolvedValue(undefined);
    await expect(useCase.execute(1)).resolves.toBeUndefined();
    expect(port.delete).toHaveBeenCalledWith(1);
  });
});
