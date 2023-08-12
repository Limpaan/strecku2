import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { testConfig } from '../config/testConfig';
import { Reflector } from '@nestjs/core';

export const globalImports = [
  JwtModule.register({
    secret: testConfig.secret,
    signOptions: { expiresIn: '8h' },
  }),
  MongooseModule.forRoot(testConfig.db),
  Reflector,
];
