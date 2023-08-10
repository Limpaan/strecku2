import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from '../../database/entities/user.entity';
import { Model } from 'mongoose';
import { SignupRequest } from './models/signup.reqest';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(signupRequest: SignupRequest): Promise<User> {
    if (
      this.userModel.exists({
        email: { $regex: new RegExp(signupRequest.email, 'i') },
      })
    ) {
      throw new HttpException(
        `Email ${signupRequest.email} already exists`,
        HttpStatus.CONFLICT,
      );
    }
    if (
      this.userModel.exists({
        name: { $regex: new RegExp(signupRequest.name, 'i') },
      })
    ) {
      throw new HttpException(
        `User with name ${signupRequest.name} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(signupRequest.password, salt);

    const newUser = new this.userModel({
      ...signupRequest,
      passwordHash: hash,
    });

    return newUser.save();
  }

  async getUser(id: string) {
    const user = await this.userModel.findById(id);
    if (user) {
      return user;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
