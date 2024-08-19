import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AppService } from './app.service';
import { ResponseDto } from './common/response.dto';
import { TServerHealth } from './common/types';
import { AuthGuard } from './modules/auth/guards/auth.guard';

@Controller()
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string | ResponseDto<string>> {
    return await this.appService.getHello();
  }

  @Get('health')
  async getServerHealth(): Promise<TServerHealth> {
    return await this.appService.getServerHealth();
  }
}
