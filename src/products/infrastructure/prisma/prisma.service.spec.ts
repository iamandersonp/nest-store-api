import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should expose a prisma client instance', () => {
    expect(service).toHaveProperty('prisma');
    expect(service.prisma).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should call $connect on the prisma client', async () => {
      const connectSpy = jest.spyOn(service.prisma, '$connect').mockResolvedValue(undefined);

      await service.onModuleInit();

      expect(connectSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onModuleDestroy', () => {
    it('should call $disconnect on the prisma client', async () => {
      const disconnectSpy = jest.spyOn(service.prisma, '$disconnect').mockResolvedValue(undefined);

      await service.onModuleDestroy();

      expect(disconnectSpy).toHaveBeenCalledTimes(1);
    });
  });
});
