/* istanbul ignore file */

import { Injectable } from '@nestjs/common';
import { MetricsPort } from '@common/domain/ports/metrics.port';

@Injectable()
export class MetricsDummyService implements MetricsPort {
  record(metric: string, value?: number, tags?: Record<string, string>): void {
    // Dummy: simplemente logea a consola

    console.log(`[DUMMY-METRICS] ${metric} - value: ${value}, tags: ${JSON.stringify(tags)}`);
  }
}
