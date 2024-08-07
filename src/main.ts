import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from './env';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(Env.PORT);
}
bootstrap();
