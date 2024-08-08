import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { APIMessages } from './common/constants';
import { convertSecondstoHhSs } from './utils/time.util';
import { ServerStats } from './common/types';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  // Method to assess server stats.
  async getServerStats(): Promise<ServerStats> {
    try {
      const uptime = process.uptime();
      const { heapTotal, heapUsed } = process.memoryUsage();
      const data = {
        uptime: convertSecondstoHhSs(uptime),
        memoryUsed: `${Math.round(heapUsed / 1000000)} MB`,
        memoryTotal: `${Math.round(heapTotal / 1000000)} MB`,
      };

      return data;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        APIMessages.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
