import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WaiterService } from './waiter.service';
import { AuthGuard } from 'src/api/auth/auth.guard';
import { WaiterLoginpDto } from 'src/api/auth/dto';


@Controller('waiter')
export class WaiterController {
    constructor(private waiterService:WaiterService){}

    @Get()
    async getAllWaiter(){
        return this.waiterService.getWaiters()
    }

    @Get(':id')
    async getById(@Param('id') id: string){
        return this.waiterService.getById(id)
    }


    // @Patch(':id')
    // async updateWaiter(@Param('id') id :string,
    // @Body() body:WaiterLoginpDto)
    // {return this.waiterService.updateWaiter(id,body)}


    @Post()
    async updateWaiter(@Headers('Waiter-Id') id :string,
    @Body() body:WaiterLoginpDto)
    {return this.waiterService.updateWaiter(id,body)}

    @Delete(':id')
    async delete(@Param('id') id:string){
        return this.waiterService.deleteWaiter(id)
    }

    

}
