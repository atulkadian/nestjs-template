import { Injectable } from '@nestjs/common';
import { ResponseDto } from './common/response.dto';

@Injectable()
export class AppService {
  async getHello(): Promise<string | ResponseDto<string>> {
    return 'Hello World!';
  }
}
