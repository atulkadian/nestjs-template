import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { APIMessages } from 'src/common/constants';
import { ResponseDto } from 'src/common/response.dto';
import { Env } from 'src/env';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T>>
{
  logger = new Logger('ResponseInterceptor');
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let response: ResponseDto<T> | any;
        context
          .switchToHttp()
          .getResponse<Response>()
          .removeHeader('X-Powered-By');
        if (data instanceof ResponseDto) {
          context.switchToHttp().getResponse().statusCode = data.statusCode;
          response = data;
        } else {
          response = new ResponseDto(
            true,
            HttpStatus.OK,
            APIMessages.SUCCESS,
            data,
          );
        }
        if (Env.ENVIRONMENT === 'local' || Env.ENVIRONMENT === 'development') {
          this.logger.debug(
            JSON.stringify({
              path: context.switchToHttp().getRequest().url,
              response,
            }),
          );
        }

        return response;
      }),
    );
  }
}
