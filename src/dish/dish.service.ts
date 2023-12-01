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
            const admin = await this.prisma.waiter.findFirst({
                where: {id:dto.waiterId}
            })

            switch (admin.role){
                case 'WAITER':
                    throw new ForbiddenException('You are not ADMIN')
                case 'ADMIN':
                    try{
                        const cook = await this.prisma.cook.findFirst({
                            where:{id:dto.cookId}
                        })
                        if (!cook){
                            throw new ConflictException('There is conflict')
                        }
                    }
                    catch (e){
                        throw new NotFoundException('Not Found Cook')
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
        catch(e){
            throw new NotFoundException('You Are not admin')
        }
    }
}
