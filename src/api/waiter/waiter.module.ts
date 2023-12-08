import { Module } from '@nestjs/common';
import { WaiterController } from './waiter.controller';
import { WaiterService } from './waiter.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule],
  controllers: [WaiterController],
  providers: [WaiterService],
  exports:[WaiterService]
})
export class WaiterModule {}
