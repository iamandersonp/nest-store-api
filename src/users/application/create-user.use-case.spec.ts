import { Test, TestingModule } from '@nestjs/testing';
import { USERS_SERVICE_PORT } from '@users/domain/ports/user.port';
import { CreateUserUseCase } from './create-user.use-case';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let port: { create: jest.Mock };

  beforeEach(async () => {
    port = { create: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserUseCase, { provide: USERS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(CreateUserUseCase);
  });

  it('should delegate create to the port', async () => {
    const payload = { firstName: 'F', lastName: 'L', userName: 'u', password: 'p', role: 'admin' };
    const expected = { id: 1, ...payload };
    port.create.mockResolvedValue(expected);
    await expect(useCase.execute(payload)).resolves.toEqual(expected);
    expect(port.create).toHaveBeenCalledWith(payload);
  });
});
