import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from 'src/common/response.dto';
import { Env } from 'src/env';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger('HttpExceptionFilter');
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as string;

    const responseBody = new ResponseDto(false, status, exceptionResponse, {});
    if (Env.ENVIRONMENT === 'local' || Env.ENVIRONMENT === 'development') {
      this.logger.error(
        JSON.stringify({
          path: ctx.getRequest().url,
          error: exceptionResponse,
        }),
      );
    }

    response.status(status).json(responseBody);
  }
}
