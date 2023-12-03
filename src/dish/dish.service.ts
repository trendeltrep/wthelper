import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddDishDto, UpdateDishDto } from './dto';

@Injectable()
export class DishService {
    constructor (private prisma: PrismaService){}

    async getAllDishes():Promise<any>{
        return this.prisma.dish.findMany()
    }

    async getAllDishesNoOrder(){
        return this.prisma.dish.findMany({
            where:{
                orderId: null
            }
        })
    }

    async addDish(dto: AddDishDto){

        try{
            const check1 = await this.prisma.waiter.findFirst({
                where: {id:dto.waiterId}
            })
        }
        catch(e){
            throw new NotFoundException('You are not admin')
        }

        try{
            const check2 = await this.prisma.cook.findFirst({
                where:{id:dto.cookId}
            })
        }
        catch(e){
            throw new NotFoundException("Not found this cookId")
        }

        const admin = await this.prisma.waiter.findFirst({
            where: {id:dto.waiterId}
        })

        switch (admin.role){
            case 'WAITER':
                throw new ForbiddenException('You are not ADMIN')
            case 'ADMIN':
                    const cook = await this.prisma.cook.findFirst({
                        where:{id:dto.cookId}
                    })
                    if (!cook){
                        throw new ConflictException('There is conflict')
                    }
                
                const result = await this.prisma.dish.create({
                    data:{
                        dishName:dto.dishName,
                        dishPrice:dto.dishPrice,
                        dishWaitTime:dto.dishWaitTime,
                        cook: {connect: {id: dto.cookId}},
                    }
                })
                return result
            }

    }


    async getById(id){
        return this.prisma.dish.findFirst({
          where:{id:id}
        })
      }
      
      async updateDish(id:string,body:UpdateDishDto){
        const check1 = body.cookId? {connect:{id:body.cookId}}:null
        const check2 = body.orderId? {connect:{id:body.orderId}}:null
        console.log(check1,check2)
        const result = await this.prisma.dish.update({
          where:{id:id},
          data: {
            dishName:body.dishName,
            dishPrice:body.dishPrice,
            dishWaitTime:body.dishWaitTime,
            cook:check1,
            order:check2
          },
          include:{cook:{select:{id:true}},order:{select:{id:true}}}
        })
        return result
      }
  
      async deleteDish(id:string){
        await this.prisma.dish.delete({where:{id}})
      }
}
