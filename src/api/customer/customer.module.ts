import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports:[CustomerService],
})
export class CustomerModule {}
