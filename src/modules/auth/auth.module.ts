import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Env } from 'src/env';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: Env.JWT.SECRET,
      signOptions: { expiresIn: Env.JWT.EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
