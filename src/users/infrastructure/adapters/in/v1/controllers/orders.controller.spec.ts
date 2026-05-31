import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { CreateOrdersDto, UpdateOrdersDto } from '../dtos/orders.dto';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Orders DTOs (for coverage and validation mapping)', () => {
    it('should be instantiable and carry data', () => {
      const createDto = new CreateOrdersDto();
      Object.assign(createDto, {
        customerId: 1,
        date: '2026-05-30',
        total: 1500,
      });

      const updateDto = new UpdateOrdersDto();
      Object.assign(updateDto, {
        total: 1800,
      });

      expect(createDto.customerId).toBe(1);
      expect(createDto.date).toBe('2026-05-30');
      expect(createDto.total).toBe(1500);
      expect(updateDto.total).toBe(1800);
    });
  });
});
