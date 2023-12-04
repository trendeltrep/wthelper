import { Module } from '@nestjs/common';
import { CookController } from './cook.controller';
import { CookService } from './cook.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule],
  controllers: [CookController],
  providers: [CookService]
})
export class CookModule {}
