import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('protected')
  async protectedRoute(): Promise<string> {
    return await this.authService.protectedRoute();
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
  ): Promise<string | { accessToken: string }> {
    return await this.authService.login(body);
  }
}
