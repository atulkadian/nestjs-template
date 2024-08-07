import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { APIMessages } from 'src/common/constants';
import { ResponseDto } from 'src/common/response.dto';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof ResponseDto) {
          context.switchToHttp().getResponse().statusCode = data.statusCode;
          return data;
        }
        return new ResponseDto(true, HttpStatus.OK, APIMessages.SUCCESS, data);
      }),
    );
  }
}
