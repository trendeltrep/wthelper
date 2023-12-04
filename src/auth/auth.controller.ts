import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { CustomerSignUpnDto, CustomerLoginDto, WaiterSignUpDto, WaiterLoginpDto } from './dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService, 
    ) {}


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

  @Post('logout')
  async logout(
    @Body() signInUserDto: CustomerLoginDto|WaiterLoginpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('jwt_token');
  }

}
