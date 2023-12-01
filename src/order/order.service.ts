import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {

    constructor ( private prisma: PrismaService){}

    async getAllOrders(){
        return this.prisma.order.findMany()
    }

    async createOrder(){}
}
