import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WaiterLoginpDto } from './dto';
import * as bcrypt from 'bcrypt';
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

    async getById(id){
      return this.prisma.waiter.findFirst({
        where:{id:id}
      })
    }

    async updateWaiter(id:string,body:WaiterLoginpDto){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password,salt)
      const result = await this.prisma.waiter.update({
        where:{id:id},
        data: {
          email: body.email,
          phoneNumber: body.phoneNumber,
          password: hashedPassword,
          waiterName:body.waiterName
        }
      })
      return result
    }

    async deleteWaiter(id:string){
      await this.prisma.waiter.delete({where:{id}})
    }
}
