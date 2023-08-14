import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginRequest } from './models/login.request';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../database/entities/user.entity';
import { Model } from 'mongoose';
import { appSecrets } from '../../../config/appSecrets';
import { appConfig } from '../../../config/appConfig';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async login(loginRequest: LoginRequest, jwtService: JwtService) {
    const [email, password] = [loginRequest.email, loginRequest.password];

    const user = await this.userModel.findOne({
      email: email.toLowerCase(),
    });

    console.log(password);

    if (user) {
      const { passwordhash } = user;
      if (await bcrypt.compare(password, passwordhash)) {
        const payload = { email: email, sub: user._id };
        return {
          access_token: jwtService.sign(payload, {
            secret: appSecrets.secret,
            issuer: appConfig.issuer,
          }),
        };
      }

      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    throw new HttpException(
      'Incorrect email or password',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
