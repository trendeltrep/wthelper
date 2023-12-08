import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DishService } from './dish.service';
import { AddDishDto, UpdateDishDto } from './dto';
import { AuthGuard } from 'src/api/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('dish')
export class DishController {

    constructor (private dishService : DishService){}

    @Get()
    async getAllDishes(){
        return this.dishService.getAllDishes()
    }

    @Get('no_order')
    async getAllDishesNoOrder(){
        return this.dishService.getAllDishesNoOrder()
    }
    
    

    @Post('add')
    async addDish(@Body() addDishDto:AddDishDto){
        return this.dishService.addDish(addDishDto)
    }

    @Get(':id')
    async getById(@Param('id') id: string){
        return this.dishService.getById(id)
    }

    @Patch(':id')
    async updateWaiter(
        @Param('id') id :string,
        @Body() body:UpdateDishDto){
            return this.dishService.updateDish(id,body)
        }

    @Delete(':id')
    async delete(@Param('id') id:string){
        return this.dishService.deleteDish(id)
    }
}
