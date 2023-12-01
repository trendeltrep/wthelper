import { Body, Controller, Get, Post } from '@nestjs/common';
import { DishService } from './dish.service';
import { AddDishDto } from './dto';

@Controller('dish')
export class DishController {

    constructor (private dishService : DishService){}

    @Get()
    async getAllDishes(){
        return this.dishService.getAllDishes()
    }

    @Post('add')
    async addDish(@Body() addDishDto:AddDishDto){
        return this.dishService.addDish(addDishDto)
    }
}
