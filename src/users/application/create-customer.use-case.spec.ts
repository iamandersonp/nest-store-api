import { Test, TestingModule } from '@nestjs/testing';
import { CUSTOMERS_SERVICE_PORT } from '@users/domain/ports/customer.port';
import { CreateCustomerUseCase } from './create-customer.use-case';

describe('CreateCustomerUseCase', () => {
  let useCase: CreateCustomerUseCase;
  let port: { create: jest.Mock };

  beforeEach(async () => {
    port = { create: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCustomerUseCase, { provide: CUSTOMERS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(CreateCustomerUseCase);
  });

  it('should delegate create to the port', async () => {
    const payload = { phone: '+54', photo: 'img', idUser: 1 };
    const expected = { id: 1, ...payload };
    port.create.mockResolvedValue(expected);
    await expect(useCase.execute(payload)).resolves.toEqual(expected);
    expect(port.create).toHaveBeenCalledWith(payload);
  });
});
