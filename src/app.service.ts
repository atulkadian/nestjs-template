import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const env = process.env.ENVIRONMENT;
    return 'Hello World!';
  }
}
