import { Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from 'src/common/response.dto';
import { APIMessages } from 'src/common/constants';

@Catch()
export class ErrorFilter {
  private readonly logger = new Logger(ErrorFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const ip = request['ip-address'];

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = APIMessages.INTERNAL_SERVER_ERROR;

    if (exception instanceof Error) {
      message = exception.message;
    }

    const responseBody = new ResponseDto(false, status, message, {});

    this.logger.error(
      JSON.stringify({
        ip,
        path: request.method + ' ' + request.url,
        error:
          exception instanceof Error && exception?.stack
            ? exception.stack
            : message,
      }),
    );

    response.status(status).json(responseBody);
  }
}
