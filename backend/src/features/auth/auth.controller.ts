import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginResult } from './models/login.result';
import { LoginRequest } from './models/login.request';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PublicRoute } from './public.route.attribute';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @PublicRoute()
  @ApiOkResponse({ type: LoginResult })
  async Login(
    @Res() response: Response<LoginResult>,
    @Body() user: LoginRequest,
  ) {
    const token = await this.authService.login(user, this.jwtService);
    return response
      .status(HttpStatus.OK)
      .cookie('access_token', token.access_token, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      })
      .send();
  }
}
