import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDto } from './common/response.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ServerStats } from './common/types';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string | ResponseDto<string>> {
    return await this.appService.getHello();
  }

  @Get('health')
  async getServerStats(): Promise<ServerStats> {
    return await this.appService.getServerStats();
  }
}
