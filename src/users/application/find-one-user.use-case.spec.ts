import { Test, TestingModule } from '@nestjs/testing';
import { USERS_SERVICE_PORT } from '@users/domain/ports/user.port';
import { FindOneUserUseCase } from './find-one-user.use-case';

describe('FindOneUserUseCase', () => {
  let useCase: FindOneUserUseCase;
  let port: { findOne: jest.Mock };

  beforeEach(async () => {
    port = { findOne: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindOneUserUseCase, { provide: USERS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(FindOneUserUseCase);
  });

  it('should delegate findOne to the port', async () => {
    const expected = {
      id: 1,
      firstName: 'F',
      lastName: 'L',
      userName: 'u',
      password: 'p',
      role: 'admin',
    };
    port.findOne.mockResolvedValue(expected);
    await expect(useCase.execute(1)).resolves.toEqual(expected);
    expect(port.findOne).toHaveBeenCalledWith(1);
  });
});
