import { Test, TestingModule } from '@nestjs/testing';
import { CUSTOMERS_SERVICE_PORT } from '@users/domain/ports/customer.port';
import { FindAllCustomersUseCase } from './find-all-customers.use-case';

describe('FindAllCustomersUseCase', () => {
  let useCase: FindAllCustomersUseCase;
  let port: { findAll: jest.Mock };

  beforeEach(async () => {
    port = { findAll: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllCustomersUseCase, { provide: CUSTOMERS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(FindAllCustomersUseCase);
  });

  it('should delegate findAll to the port', async () => {
    const expected = [{ id: 1, phone: '+54', photo: 'img', idUser: 1 }];
    port.findAll.mockResolvedValue(expected);
    await expect(useCase.execute()).resolves.toEqual(expected);
    expect(port.findAll).toHaveBeenCalledWith();
  });
});
