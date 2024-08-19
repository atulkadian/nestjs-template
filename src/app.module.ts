import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { Env } from './env';
import { ConfigModule } from './config/config.module';
import { Databases } from './common/constants';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ErrorFilter } from './filters/error.filter';
import { TerminusModule } from '@nestjs/terminus';

const typeOrmOptions: TypeOrmModuleOptions = {
  type: Env.DATABASE.TYPE,
  database: Env.DATABASE.DATABASE_NAME,
  autoLoadEntities: true,
  synchronize: Env.DATABASE.SYNC.toLowerCase() === 'true' ? true : false,
  entities: [],
};

if (Env.DATABASE.TYPE !== Databases.SQLITE) {
  Object.assign(typeOrmOptions, {
    host: Env.DATABASE.HOST,
    username: Env.DATABASE.DB_USER,
    password: Env.DATABASE.DB_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    ThrottlerModule.forRoot([
      {
        ttl: Env.RATE_LIMIT.TTL,
        limit: Env.RATE_LIMIT.MAX_REQUESTS,
      },
    ]),
    ConfigModule,
    CacheModule.register({
      isGlobal: true,
    }),
    TerminusModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
  ],
})
export class AppModule {}
