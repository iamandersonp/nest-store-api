import { Test, TestingModule } from '@nestjs/testing';
import { USERS_SERVICE_PORT } from '@users/domain/ports/user.port';
import { GetOrdersByUserUseCase } from './get-orders-by-user.use-case';

describe('GetOrdersByUserUseCase', () => {
  let useCase: GetOrdersByUserUseCase;
  let port: { getOrdersByUser: jest.Mock };

  beforeEach(async () => {
    port = { getOrdersByUser: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetOrdersByUserUseCase, { provide: USERS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(GetOrdersByUserUseCase);
  });

  it('should delegate getOrdersByUser to the port', async () => {
    const expected = {
      id: 1,
      date: new Date('2026-01-01T00:00:00Z'),
      user: {} as any,
      products: [],
      total: 0,
    };
    port.getOrdersByUser.mockResolvedValue(expected);
    await expect(useCase.execute(1)).resolves.toEqual(expected);
    expect(port.getOrdersByUser).toHaveBeenCalledWith(1);
  });
});
