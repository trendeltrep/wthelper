import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto';
import { OrderStatus } from 'src/constants/enum';

@Injectable()
export class OrderService {

    constructor ( private prisma: PrismaService){}

    async getAllOrders(){
        return this.prisma.order.findMany()
    }

    async createOrder(dto: CreateOrderDto){
        try{
            const waiter = await this.prisma.waiter.findFirst({
                where:{id:dto.waiterId}
            })
            const customer = await this.prisma.customer.findFirst({
                where:{id:dto.customerId}
            })
            const table = await this.prisma.table.findFirst({
                where:{id:dto.tableId}
            })
            const dishes = await Promise.all(
                dto.dishId.map((id)=>this.prisma.dish.findFirst({where:{id:id}}))
            )
        }
        catch(e){
            throw new NotFoundException("Not found waiter/customer/table/dish")
        }
        const dishes = await Promise.all(
            dto.dishId.map((id)=>this.prisma.dish.findFirst({where:{id:id}}))
        )

        const createNewDishes = await Promise.all(
            dishes.map(element => {
                this.prisma.dish.create({
                    data:{
                        dishName: element.dishName,
                        dishPrice:element.dishPrice,
                        dishWaitTime:element.dishWaitTime,
                        cook: {connect: {id: element.cookId}}
                    }
                })
            })
        )
        const totalCost = createNewDishes.reduce((sum, dish) => sum + dish.dishPrice, 0);
        const totalWait = createNewDishes.reduce((sum, dish) => sum + dish.dishWaitTime, 0);

        const result = await this.prisma.order.create({
            data:{
                totalPrice:totalCost,
                totalWaitTime:totalWait,
                status: OrderStatus.MAKING,
                tip:dto.tip,
                customer: {connect: {id: dto.customerId}},
                waiter: {connect: {id: dto.waiterId}},
                table: {connect: {id: dto.tableId}},
                dishes: {
                    connect: dto.dishId.map(id => ({ id }))
                }
    
            },
            include:{dishes:{select:{id:true}}}

        })
        const waiter = await this.prisma.waiter.findFirst({
            where:{id:dto.waiterId}
        })
        const customer = await this.prisma.customer.findFirst({
            where:{id:dto.customerId}
        })
        const table = await this.prisma.table.findFirst({
            where:{id:dto.tableId}
        })
        

        return result
    }
}
