import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {
    constructor(private prisma:PrismaService){}

    async getCustomer(email:string):Promise<any>{
        return this.prisma.customer.findUnique({
            where: {
              email:email,
            },
          });
    }

    async getCustomers(): Promise<any>{
        return this.prisma.customer.findMany()
    }
}
