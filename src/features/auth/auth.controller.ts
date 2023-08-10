import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginResult } from './models/login.result';
import { LoginRequest } from './models/login.request';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async Login(
    @Res() response: Response<LoginResult>,
    @Body() user: LoginRequest,
  ) {
    const token = await this.authService.login(user, this.jwtService);
    return response.status(HttpStatus.OK).json(token);
  }
}
