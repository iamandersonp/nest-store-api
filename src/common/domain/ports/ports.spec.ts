import { EMAIL_PORT } from './email.port';
import { LOGGER_PORT } from './logger.port';
import { METRICS_PORT } from './metrics.port';

describe('CommonPorts', () => {
  it('should define EMAIL_PORT as a symbol', () => {
    expect(typeof EMAIL_PORT).toBe('symbol');
    expect(EMAIL_PORT.description).toBe('EMAIL_PORT');
  });

  it('should define LOGGER_PORT as a symbol', () => {
    expect(typeof LOGGER_PORT).toBe('symbol');
    expect(LOGGER_PORT.description).toBe('LOGGER_PORT');
  });

  it('should define METRICS_PORT as a symbol', () => {
    expect(typeof METRICS_PORT).toBe('symbol');
    expect(METRICS_PORT.description).toBe('METRICS_PORT');
  });

  it('should have unique symbols', () => {
    expect(EMAIL_PORT).not.toBe(LOGGER_PORT);
    expect(LOGGER_PORT).not.toBe(METRICS_PORT);
    expect(METRICS_PORT).not.toBe(EMAIL_PORT);
  });
});
