/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { EmailPort } from '@common/domain/ports/email.port';

/**
 * Dummy EmailPort (no envía, loguea en consola).
 */
@Injectable()
export class DummyEmailService implements EmailPort {
  async sendMail(to: string, subject: string, body: string): Promise<void> {
    // Simulamos asincronía para cumplir eslint/require-await
    await Promise.resolve();
    console.log(`[DUMMY-EMAIL] A: ${to}; SUBJECT: ${subject}; BODY: ${body}`);
  }
}
