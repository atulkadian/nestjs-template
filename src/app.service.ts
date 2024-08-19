import { Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  DiskHealthIndicator,
  TypeOrmHealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { convertSecondstoHhSs } from './utils/time.util';
import { TServerHealth } from './common/types';
import { Env } from './env';

@Injectable()
export class AppService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  // Method to assess server stats.
  async getServerHealth(): Promise<TServerHealth> {
    const upTime = process.uptime();
    const uptimeInSeconds = convertSecondstoHhSs(upTime);
    const healthData = await this.health.check([
      (): Promise<HealthIndicatorResult> =>
        this.disk.checkStorage('storage', {
          path: '/',
          thresholdPercent: Env.DISK_HEALTH_THRESHOLD,
        }),
      (): Promise<HealthIndicatorResult> => this.db.pingCheck('database'),
    ]);

    return { upTime: uptimeInSeconds, ...healthData };
  }
}
