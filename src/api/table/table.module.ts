import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule],
  controllers: [TableController],
  providers: [TableService]
})
export class TableModule {}
