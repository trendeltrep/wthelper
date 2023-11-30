import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WaiterService {
    constructor(private prisma:PrismaService){}

    async getWaiter(email:string):Promise<any>{
        return this.prisma.waiter.findUnique({
            where: {
              email:email,
            },
          });
    }

    async getWaiters(): Promise<any>{
        return this.prisma.waiter.findMany()
    }
}
