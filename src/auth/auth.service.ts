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
import { CustomerService } from 'src/customer/customer.service';
import { WaiterLoginpDto, WaiterSignUpDto } from 'src/waiter/dto';
import { WaiterService } from 'src/waiter/waiter.service';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
    private customerService: CustomerService,
    private waiterService: WaiterService
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
    if (await this.customerService.getCustomer(dto.email))
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.FORBIDDEN,
      );
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
    return await this.customerLogin(dto as CustomerLoginDto);

  }

  async customerLogin(dto: CustomerLoginDto) {
    const customer = await this.customerService.getCustomer(dto.email);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    if (customer.customerName !== dto.customerName || customer.phoneNumber!== dto.phoneNumber){
      throw new UnauthorizedException("Invalid credentials");
    }
    const match = await bcrypt.compare(dto.password, customer.password);
    if (match) {
      const payload = { sub: customer.id, email: customer.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
        customer: customer
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }


  async waiterSignUp(dto: WaiterSignUpDto) {
    if (await this.waiterService.getWaiter(dto.email))
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.FORBIDDEN,
      );
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    const createdCustomer = await this.prisma.waiter.create({
      data: {
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        password:hashedPassword,
        waiterName:dto.waiterName,
        role:dto.role
      },
    });
    return await this.waiterLogin(dto as WaiterLoginpDto);

  }

  async waiterLogin(dto: WaiterLoginpDto) {
    const waiter = await this.waiterService.getWaiter(dto.email);
    if (!waiter) {
      throw new NotFoundException('Customer not found');
    }
    if (waiter.waiterName !== dto.waiterName || waiter.phoneNumber!== dto.phoneNumber){
      throw new UnauthorizedException("Invalid credentials");
    }
    const match = await bcrypt.compare(dto.password, waiter.password);
    if (match) {
      const payload = { sub: waiter.id, email: waiter.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
        waiter: waiter
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  
}
