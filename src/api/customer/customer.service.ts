import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomerLoginDto } from 'src/api/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as EmailValidator from 'email-validator';


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

    async getById(id){
        return this.prisma.customer.findFirst({
          where:{id:id}
        })
      }
  
      async updateCustomer(id:string,body:CustomerLoginDto){
        if (!EmailValidator.validate(body.email) ){
          throw new BadRequestException("Invalid email")
        }
        if (!/^\d{10}$/.test(body.phoneNumber)){
          throw new BadRequestException('Invalid phone number')
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password,salt)
        const result = await this.prisma.customer.update({
          where:{id:id},
          data: {
            email: body.email,
            phoneNumber: body.phoneNumber,
            password: hashedPassword,
            customerName:body.customerName
          }
        })
        return result
      }
  
      async deleteCustomer(id:string){
        await this.prisma.customer.delete({where:{id}})
      }
}
