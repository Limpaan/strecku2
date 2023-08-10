import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { appSecrets } from '../config/appSecrets';
import { AuthModule } from './features/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JwtModule.register({
      secret: appSecrets.secret,
      signOptions: { expiresIn: '8h' },
    }),
    MongooseModule.forRoot(appSecrets.db),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
