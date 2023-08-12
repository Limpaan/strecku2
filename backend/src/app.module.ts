import { Module } from '@nestjs/common';
import { UserModule } from './features/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { appSecrets } from '../config/appSecrets';
import { AuthModule } from './features/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from './features/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: appSecrets.secret,
      signOptions: { expiresIn: '8h' },
    }),
    MongooseModule.forRoot(appSecrets.db),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
