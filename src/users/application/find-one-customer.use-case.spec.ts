import { Test, TestingModule } from '@nestjs/testing';
import { CUSTOMERS_SERVICE_PORT } from '@users/domain/ports/customer.port';
import { FindOneCustomerUseCase } from './find-one-customer.use-case';

describe('FindOneCustomerUseCase', () => {
  let useCase: FindOneCustomerUseCase;
  let port: { findOne: jest.Mock };

  beforeEach(async () => {
    port = { findOne: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindOneCustomerUseCase, { provide: CUSTOMERS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(FindOneCustomerUseCase);
  });

  it('should delegate findOne to the port', async () => {
    const expected = { id: 1, phone: '+54', photo: 'img', idUser: 1 };
    port.findOne.mockResolvedValue(expected);
    await expect(useCase.execute(1)).resolves.toEqual(expected);
    expect(port.findOne).toHaveBeenCalledWith(1);
  });
});
