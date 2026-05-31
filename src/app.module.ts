import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

import { LOGGER_PORT } from '@common/domain/ports/logger.port';
import { ConsoleLoggerService } from '@common/infrastructure/adapters/logger.service';
import { EMAIL_PORT } from '@common/domain/ports/email.port';
import { DummyEmailService } from '@common/infrastructure/adapters/email-dummy.service';
import { METRICS_PORT } from '@common/domain/ports/metrics.port';
import { MetricsDummyService } from '@common/infrastructure/adapters/metrics-dummy.service';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [
    { provide: LOGGER_PORT, useClass: ConsoleLoggerService },
    { provide: EMAIL_PORT, useClass: DummyEmailService },
    { provide: METRICS_PORT, useClass: MetricsDummyService },
  ],
})
export class AppModule {}
