import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { userDTO } from '../DTOs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  signUp(@Body() body: userDTO) {
    return this.authService.register(body);
  }

  @Post('/login')
  signIn(@Body() body: userDTO) {
    return this.authService.login(body);
  }
}
