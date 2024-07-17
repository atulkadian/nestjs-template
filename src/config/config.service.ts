import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class ConfigService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ConfigService.name);

  async onApplicationBootstrap() {
    this.logger.log(`ConfigService initialized`);
  }
}
