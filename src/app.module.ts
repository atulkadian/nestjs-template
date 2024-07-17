import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Env } from './env';
import { ConfigModule } from './config/config.module';
import { Databases } from './common/constants';

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
  imports: [TypeOrmModule.forRoot(typeOrmOptions), ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
