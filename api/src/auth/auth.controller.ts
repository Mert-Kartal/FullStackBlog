import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from 'src/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterUserDto) {
    return this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: LoginUserDto) {
    return this.authService.login(data);
  }

  @Post('logout')
  async logout(@Body() data: { refreshToken: string }) {
    return this.authService.logout(data.refreshToken);
  }

  @Post('refresh')
  async refresh(@Body() data: { refreshToken: string }) {
    return this.authService.refresh(data.refreshToken);
  }
}
