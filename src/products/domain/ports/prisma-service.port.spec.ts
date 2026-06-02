import { PRISMA_SERVICE_PORT } from './prisma-service.port';

describe('PrismaServicePort', () => {
  it('should define PRISMA_SERVICE_PORT as a symbol', () => {
    expect(typeof PRISMA_SERVICE_PORT).toBe('symbol');
    expect(PRISMA_SERVICE_PORT.description).toBe('PRISMA_SERVICE_PORT');
  });
});
