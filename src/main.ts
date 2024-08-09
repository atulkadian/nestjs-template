import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from './env';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { IpAddressMiddleware } from './middlewares/ip-address.middleware';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.use(new IpAddressMiddleware().use);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(Env.PORT);
}
bootstrap();
