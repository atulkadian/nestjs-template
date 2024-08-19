import { HealthCheckResult } from '@nestjs/terminus';

export interface TServerHealth extends HealthCheckResult {
  upTime: string;
}
