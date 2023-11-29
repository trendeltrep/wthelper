import { PartialType } from '@nestjs/mapped-types';
import { LoginUserDto } from '../../auth/dto';

export class UpdateUserDto extends PartialType(LoginUserDto) {}
