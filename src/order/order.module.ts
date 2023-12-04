import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
