import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { getConnectionToken } from '@nestjs/mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import mongoose, { Connection } from 'mongoose';
import { UserDocument, UserSchema } from '../../database/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { testConfig } from '../../../config/testConfig';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { globalImports } from '../../../test/test.helpers';

describe('AuthController', () => {
  let app: INestApplication | undefined;

  const apiClient = () => supertest(app.getHttpServer());

  const okEmail = 'test@festu.se';
  const badEmail = 'bad@festu.se';
  const okPassword = 'test_password';
  const okPasswordHash = bcrypt.hashSync(okPassword, bcrypt.genSaltSync());
  const badPasswordHash = bcrypt.hashSync('bad_password', bcrypt.genSaltSync());
  const authRequest = {
    email: okEmail,
    password: okPassword,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [...globalImports, AuthModule],
      providers: [
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
    }).compile();
    await mongoose.connect(testConfig.db, { dbName: testConfig.dbName });

    app = moduleRef.createNestApplication<NestExpressApplication>();
    await app.listen(3333);
  });

  afterEach(async () => {
    await (app?.get(getConnectionToken()) as Connection)?.db.dropDatabase();
    await app?.close();
  });

  describe('POST /api/v1/auth/login', () => {
    it('should return 401 when no user match', async () => {
      await apiClient()
        .post('/api/v1/auth/login')
        .send(authRequest)
        .expect(401);
    });

    it('should return 401 when email match but password does not', async () => {
      await mongoose.model<UserDocument>('User', UserSchema).create({
        name: 'test',
        email: okEmail,
        passwordhash: badPasswordHash,
      });

      await apiClient()
        .post('/api/v1/auth/login')
        .send(authRequest)
        .expect(401);
    });

    it('should return 401 when email does not match', async () => {
      await mongoose.model<UserDocument>('User', UserSchema).create({
        name: 'test',
        email: badEmail,
        passwordhash: okPasswordHash,
      });

      await apiClient()
        .post('/api/v1/auth/login')
        .send(authRequest)
        .expect(401);
    });

    it('should return 200 when email and password match and token', async () => {
      await mongoose.model<UserDocument>('User', UserSchema).create({
        name: 'test',
        email: okEmail,
        passwordhash: okPasswordHash,
      });

      await apiClient()
        .post('/api/v1/auth/login')
        .send(authRequest)
        .expect(200)
        .expect((res) => {
          const accessToken = res.body.access_token;
          expect(accessToken).toBeDefined();
        });
    });
  });
});
