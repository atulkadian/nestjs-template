import { Catch, HttpException, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from 'src/common/response.dto';
import { APIMessages } from 'src/common/constants';

@Catch(HttpException)
export class HttpExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const ip = request['ip-address'];

    const status = exception.getStatus();
    const message = exception.message || APIMessages.INTERNAL_SERVER_ERROR;
    const error = exception.getResponse();
    const data =
      error && typeof error['message'] === 'object' ? error['message'] : null;

    const responseBody = new ResponseDto(false, status, message, data);

    this.logger.error(
      JSON.stringify({
        ip,
        path: request.method + ' ' + request.url,
        error: data ? data : message,
      }),
    );

    response.status(status).json(responseBody);
  }
}
