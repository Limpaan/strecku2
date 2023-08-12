import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from '../../database/entities/user.entity';
import { Model } from 'mongoose';
import { SignupRequest } from './models/signup.request';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(signupRequest: SignupRequest): Promise<UserDocument> {
    if (
      await this.userModel
        .exists({
          email: signupRequest.email.toLowerCase(),
        })
        .exec()
    ) {
      throw new HttpException(
        `Email ${signupRequest.email} already exists`,
        HttpStatus.CONFLICT,
      );
    }
    if (
      await this.userModel
        .exists({
          name: { $regex: new RegExp(signupRequest.name, 'i') },
        })
        .exec()
    ) {
      throw new HttpException(
        `User with name ${signupRequest.name} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(signupRequest.password, salt);

    const newUser = new this.userModel({
      name: signupRequest.name,
      email: signupRequest.email.toLowerCase(),
      passwordhash: hash,
    });

    return newUser.save();
  }

  async getUser(id: number) {
    const user = await this.userModel.findById(id);
    if (user) {
      return user;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
