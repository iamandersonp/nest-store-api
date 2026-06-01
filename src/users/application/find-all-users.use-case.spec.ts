import { Test, TestingModule } from '@nestjs/testing';
import { USERS_SERVICE_PORT } from '@users/domain/ports/user.port';
import { FindAllUsersUseCase } from './find-all-users.use-case';

describe('FindAllUsersUseCase', () => {
  let useCase: FindAllUsersUseCase;
  let port: { findAll: jest.Mock };

  beforeEach(async () => {
    port = { findAll: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllUsersUseCase, { provide: USERS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(FindAllUsersUseCase);
  });

  it('should delegate findAll to the port', async () => {
    const expected = [
      { id: 1, firstName: 'F', lastName: 'L', userName: 'u', password: 'p', role: 'admin' },
    ];
    port.findAll.mockResolvedValue(expected);
    await expect(useCase.execute()).resolves.toEqual(expected);
    expect(port.findAll).toHaveBeenCalledWith();
  });
});
