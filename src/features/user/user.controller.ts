import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupRequest } from './models/signup.request';
import { Response } from 'express';
import { SignupResult } from './models/signup.result';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
@Controller('/api/v1/user')
@ApiBearerAuth()
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  @PublicRoute()
  async Signup(
    @Res() response: Response<SignupResult>,
    @Body() signupRequest: SignupRequest,
  ) {
    const newUser = await this.userService.signup(signupRequest);
    const token = await this.authService.login(signupRequest, this.jwtService);
    return response.status(HttpStatus.CREATED).json({
      user: {
        ...newUser,
        id: newUser._id,
      },
      auth: token,
    });
  }

  @Get(':id')
  async GetUser(@Res() response: Response, @Param('id') id: number) {
    const user = await this.userService.getUser(id);
    return response.status(HttpStatus.OK).json(user);
  }
}
import { PublicRoute } from '../auth/public.route.attribute';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
