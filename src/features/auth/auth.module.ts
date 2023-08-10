import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDefinition } from '../../database/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { appSecrets } from '../../../config/appSecrets';

@Module({
  imports: [
    MongooseModule.forFeature([UserDefinition]),
    JwtModule.register({ secret: appSecrets.secret }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
