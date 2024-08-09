import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { APIMessages } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private users = [
    {
      username: 'admin',
      password: '12345',
    },
    {
      username: 'dev',
      password: 'abcdef',
    },
  ];

  async login(body: LoginDto): Promise<{ accessToken: string }> {
    const user = this.users.find(
      (user) =>
        user.username === body.username && user.password === body.password,
    );
    if (!user) {
      throw new UnauthorizedException(APIMessages.INVALID_CREDENTIALS);
    }
    const accessToken = this.jwtService.sign({ username: user.username });

    return { accessToken };
  }

  async protectedRoute(): Promise<string> {
    return 'This is a protected route';
  }
}
