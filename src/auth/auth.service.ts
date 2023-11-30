import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpUserDto, LoginUserDto, CustomerSignUpnDto, CustomerLoginDto } from './dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signUp(dto: SignUpUserDto) {
    if (await this.userService.getUser(dto.email))
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.FORBIDDEN,
      );
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    const createdUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash: hashedPassword,
        salt: salt,
        phoneNumber: dto.phoneNumber,
      },
    });
    return await this.login(dto as LoginUserDto);
  }

  async login(dto: LoginUserDto) {
    const user = await this.userService.getUser(dto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const match = await bcrypt.compare(dto.password, user.hash);
    if (match) {
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async customerSignUp(dto: CustomerSignUpnDto) {
    // if (await this.userService.getUser(dto.email))
    //   throw new HttpException(
    //     'User with this email already exists',
    //     HttpStatus.FORBIDDEN,
    //   );
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    const createdCustomer = await this.prisma.customer.create({
      data: {
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        password:hashedPassword,
        customerName:dto.customerName
      },
    });
    try{
      await this.customerLogin(dto as CustomerLoginDto);
      return createdCustomer
    }
    catch (e){
      console.log(e)
    }

  }

  async customerLogin(dto: LoginUserDto) {
    const user = await this.userService.getUser(dto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const match = await bcrypt.compare(dto.password, user.hash);
    if (match) {
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  
}
