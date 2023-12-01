import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto';

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
}
