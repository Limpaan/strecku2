import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from '../../database/entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '../../services/email/mailer.service';
import { JwtPayload } from './jwtPayload';
import { appConfig } from '../../../config/appConfig';
import { appSecrets } from '../../../config/appSecrets';
import { CreateAccountRequest } from './models/create.account.request';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(
    email: string,
    mailerService: MailerService,
    jwtService: JwtService,
  ): Promise<void> {
    if (
      await this.userModel
        .exists({
          email: email.toLowerCase(),
        })
        .exec()
    ) {
      throw new HttpException(
        `A user with email ${email} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    const payload: JwtPayload = {
      type: 'signup',
      email: email.toLowerCase(),
    };
    const jwt = jwtService.sign(payload, {
      secret: appSecrets.secret,
      issuer: appConfig.issuer,
      expiresIn: '1h',
    });
    const link = `${appConfig.appUrl}/create-account?token=${jwt}`;

    await mailerService.sendSelfSignup(email.toLowerCase(), link);
  }

  async createAccount(
    createAccountRequest: CreateAccountRequest,
    jwtService: JwtService,
  ) {
    const { email, name, password, token } = createAccountRequest;

    try {
      await jwtService.verifyAsync(token, { secret: appSecrets.secret });
    } catch (error) {
      throw new HttpException(
        'Invalid token, try signing up again',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      await this.userModel
        .exists({
          email: email.toLowerCase(),
        })
        .exec()
    ) {
      throw new HttpException(
        `A user with ${email} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    const salt = await bcrypt.genSalt();
    const passwordhash = await bcrypt.hash(password, salt);

    await this.userModel.create({
      email: email,
      name: name,
      passwordhash: passwordhash,
    });
  }
}
