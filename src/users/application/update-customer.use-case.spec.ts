import { Test, TestingModule } from '@nestjs/testing';
import { CUSTOMERS_SERVICE_PORT } from '@users/domain/ports/customer.port';
import { UpdateCustomerUseCase } from './update-customer.use-case';

describe('UpdateCustomerUseCase', () => {
  let useCase: UpdateCustomerUseCase;
  let port: { update: jest.Mock };

  beforeEach(async () => {
    port = { update: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCustomerUseCase, { provide: CUSTOMERS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(UpdateCustomerUseCase);
  });

  it('should delegate update to the port', async () => {
    const payload = { phone: '+1' };
    const expected = { id: 1, phone: '+1', photo: 'img', idUser: 1 };
    port.update.mockResolvedValue(expected);
    await expect(useCase.execute(1, payload)).resolves.toEqual(expected);
    expect(port.update).toHaveBeenCalledWith(1, payload);
  });
});
