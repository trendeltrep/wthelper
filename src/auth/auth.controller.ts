import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { SignUpUserDto, LoginUserDto, CustomerSignUpnDto, CustomerLoginDto } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';
import { CustomerService } from 'src/customer/customer.service';
import { WaiterLoginpDto, WaiterSignUpDto } from 'src/waiter/dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService, 
    ) {}

  @Post('signup')
  async signup(
    @Body() signUpUserDto: SignUpUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.signUp(signUpUserDto);
    response.cookie('jwt_token', access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60,
    });
    return access_token
  }

  @Post('customer_signup')
  async customer_signup(
    @Body() signUpCustomerDto: CustomerSignUpnDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token,customer } = await this.authService.customerSignUp(signUpCustomerDto);
    response.cookie('jwt_token', access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60,
    });

    return customer
  }

  @Post('login')
  async login(
    @Body() signInUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.login(signInUserDto);

    response.cookie('jwt_token', access_token, {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
    return {
      message: 'Login successful',
      access_token: access_token,
    };
  }

  @Post('customer_login')
  async customer_login(
    @Body() signInCustomerDto: CustomerLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, customer } = await this.authService.customerLogin(signInCustomerDto);

    response.cookie('jwt_token', access_token, {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
    return {
      message: 'Login successful',
      access_token: access_token,
      customer
    };
  }

  @Post('logout')
  async logout(
    @Body() signInUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('jwt_token');
  }

  
  @Post('waiter_signup')
  async waiter_signup(
    @Body() signUpWaiterDto: WaiterSignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token,waiter } = await this.authService.waiterSignUp(signUpWaiterDto);
    response.cookie('jwt_token', access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60,
    });

    return waiter
  }

  @Post('waiter_login')
  async waiter_login(
    @Body() signInWaiterDto: WaiterLoginpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, waiter } = await this.authService.waiterLogin(signInWaiterDto);

    response.cookie('jwt_token', access_token, {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
    return {
      message: 'Login successful',
      access_token: access_token,
      waiter
    };
  }


  @UseGuards(AuthGuard)
  @Get('info')
  getUserInfo(@Request() req) {
    return {
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
    };
  }
}
