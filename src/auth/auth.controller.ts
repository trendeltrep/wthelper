import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { SignUpUserDto, LoginUserDto, CustomerSignUpnDto } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
    @Body() signUpUserDto: CustomerSignUpnDto,
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

  @Post('logout')
  async logout(
    @Body() signInUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('jwt_token');
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
