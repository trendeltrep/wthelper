import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { WaiterModule } from './waiter/waiter.module';
import { CookModule } from './cook/cook.module';
import { DishModule } from './dish/dish.module';
import { TableModule } from './table/table.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomerModule,
    WaiterModule,
    CookModule,
    DishModule,
    TableModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
