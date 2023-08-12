import { UserDto } from './user.dto';

export class SignupResult {
  user: UserDto;
  auth: {
    access_token: string;
  };
}
