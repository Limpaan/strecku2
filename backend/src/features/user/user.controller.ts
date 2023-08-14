import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupRequest } from './models/signup.request';
import { Response } from 'express';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { PublicRoute } from '../auth/public.route.attribute';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MailerService } from '../../services/email/mailer.service';
import { CreateAccountResult } from './models/create.account.result';
import { CreateAccountRequest } from './models/create.account.request';

@Controller('/api/v1/user')
@ApiCookieAuth('access_token')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  @PublicRoute()
  async Signup(
    @Res() response: Response,
    @Body() signupRequest: SignupRequest,
  ) {
    await this.userService.signup(
      signupRequest.email,
      this.mailerService,
      this.jwtService,
    );

    return response.status(HttpStatus.OK).send();
  }

  @Post('create-account')
  @PublicRoute()
  @ApiOkResponse({ type: CreateAccountResult })
  async CreateAccount(
    @Res() response: Response<CreateAccountResult>,
    @Body() createAccountRequest: CreateAccountRequest,
  ) {
    await this.userService.createAccount(createAccountRequest, this.jwtService);
    const token = await this.authService.login(
      createAccountRequest,
      this.jwtService,
    );

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
