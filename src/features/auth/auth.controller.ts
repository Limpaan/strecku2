import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginResult } from './models/login.result';
import { LoginRequest } from './models/login.request';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PublicRoute } from './public.route.attribute';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @PublicRoute()
  @ApiResponse({ type: LoginResult, status: 200 })
  async Login(
    @Res() response: Response<LoginResult>,
    @Body() user: LoginRequest,
  ) {
    const token = await this.authService.login(user, this.jwtService);
    return response.status(HttpStatus.OK).json(token);
  }
}
