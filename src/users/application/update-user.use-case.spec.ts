import { Test, TestingModule } from '@nestjs/testing';
import { USERS_SERVICE_PORT } from '@users/domain/ports/user.port';
import { UpdateUserUseCase } from './update-user.use-case';

describe('UpdateUserUseCase', () => {
  let useCase: UpdateUserUseCase;
  let port: { update: jest.Mock };

  beforeEach(async () => {
    port = { update: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateUserUseCase, { provide: USERS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(UpdateUserUseCase);
  });

  it('should delegate update to the port', async () => {
    const payload = { firstName: 'New' };
    const expected = {
      id: 1,
      firstName: 'New',
      lastName: 'L',
      userName: 'u',
      password: 'p',
      role: 'admin',
    };
    port.update.mockResolvedValue(expected);
    await expect(useCase.execute(1, payload)).resolves.toEqual(expected);
    expect(port.update).toHaveBeenCalledWith(1, payload);
  });
});
