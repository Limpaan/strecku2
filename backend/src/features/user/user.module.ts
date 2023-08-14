import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDefinition } from '../../database/entities/user.entity';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { MailerModule } from '../../services/email/mailer.module';

@Module({
  imports: [
    MongooseModule.forFeature([UserDefinition]),
    AuthModule,
    MailerModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
