import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { WaiterLoginpDto } from 'src/api/auth/dto';
import * as EmailValidator from 'email-validator';


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

    // async updateWaiter(id:string,body:WaiterLoginpDto){
      
    //   if (!EmailValidator.validate(body.email) ){
    //     throw new BadRequestException("Invalid email")
    //   }
    //   if (!/^\d{10}$/.test(body.phoneNumber)){
    //     throw new BadRequestException('Invalid phone number')
    //   }
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(body.password,salt)
    //   const result = await this.prisma.waiter.update({
    //     where:{id:id},
    //     data: {
    //       email: body.email,
    //       phoneNumber: body.phoneNumber,
    //       password: hashedPassword,
    //       waiterName:body.waiterName
    //     }
    //   })
    //   return result
    // }

    async updateWaiter(id:string,body){
      try{
        console.log("1")
        const result = await this.prisma.waiter.update({
          where:{id:id},
          data: {
            heartbeat:body.heartbeat
          }
        })
        return result.heartbeat
      }
      catch(e){
        throw new ForbiddenException()
      }
      
    }

    async deleteWaiter(id:string){
      await this.prisma.waiter.delete({where:{id}})
    }
}
