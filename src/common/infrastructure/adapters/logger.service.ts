/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { LoggerPort } from '@common/domain/ports/logger.port';

/**
 * Implementación básica de LoggerPort usando consola.
 */
@Injectable()
export class ConsoleLoggerService implements LoggerPort {
  info(message: string, context?: string): void {
    console.info(`[INFO]${context ? ` [${context}]` : ''} ${message}`);
  }
  warn(message: string, context?: string): void {
    console.warn(`[WARN]${context ? ` [${context}]` : ''} ${message}`);
  }
  error(message: string, trace?: string, context?: string): void {
    console.error(
      `[ERROR]${context ? ` [${context}]` : ''} ${message}${trace ? `\n${trace}` : ''}`,
    );
  }
}
