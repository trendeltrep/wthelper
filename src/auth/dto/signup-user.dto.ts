import { PartialType } from '@nestjs/mapped-types';
import { LoginUserDto } from './login-user.dto';

export class SignUpUserDto extends PartialType(LoginUserDto) {
  phoneNumber?: string;
}
