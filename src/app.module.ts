import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './api/customer/customer.module';
import { WaiterModule } from './api/waiter/waiter.module';
import { CookModule } from './api/cook/cook.module';
import { DishModule } from './api/dish/dish.module';
import { TableModule } from './api/table/table.module';
import { OrderModule } from './api/order/order.module';

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
