import { User } from '../../../database/entities/user.entity';

export type SignupResult = {
  user: User;
  auth: {
    access_token: string;
  };
};
