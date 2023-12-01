import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddDishDto } from './dto';

@Injectable()
export class DishService {
    constructor (private prisma: PrismaService){}

    async getAllDishes():Promise<any>{
        return this.prisma.dish.findMany()
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
                        cook: {connect: {id: dto.cookId}}
                    }
                })
                return result
            }

    }
}
