import { Test, TestingModule } from '@nestjs/testing';
import { CUSTOMERS_SERVICE_PORT } from '@users/domain/ports/customer.port';
import { DeleteCustomerUseCase } from './delete-customer.use-case';

describe('DeleteCustomerUseCase', () => {
  let useCase: DeleteCustomerUseCase;
  let port: { delete: jest.Mock };

  beforeEach(async () => {
    port = { delete: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteCustomerUseCase, { provide: CUSTOMERS_SERVICE_PORT, useValue: port }],
    }).compile();
    useCase = module.get(DeleteCustomerUseCase);
  });

  it('should delegate delete to the port', async () => {
    port.delete.mockResolvedValue(undefined);
    await expect(useCase.execute(1)).resolves.toBeUndefined();
    expect(port.delete).toHaveBeenCalledWith(1);
  });
});
