import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/api/auth/auth.guard';


@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {

    constructor (private orderService:OrderService){}


    @Get()
    async getAllOrders(){
        return this.orderService.getAllOrders()
    }


    @Post('create')
    async createOrder(
        @Body() createOrderDto : CreateOrderDto
    ){
        return this.orderService.createOrder(createOrderDto)
    }

    @Get(':id')
    async getById(
        @Param('id') id:string
    ){
        return this.orderService.getById(id)
    }

    @Patch(':id')
    async update(
        @Param('id') id:string,
        @Body() body:UpdateOrderDto
    ){
        return this.orderService.update(id,body)
    }

    @Delete(':id')
    async delete(
        @Param('id') id:string
    ){
        return this.orderService.delete(id)
    }
}
