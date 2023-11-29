import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }
  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany({ orderBy: { id: 'desc' } });
  }
}
