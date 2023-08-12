import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDefinition } from '../../database/entities/user.entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { appSecrets } from '../../../config/appSecrets';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([UserDefinition]),
    JwtModule.register({ secret: appSecrets.secret }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
