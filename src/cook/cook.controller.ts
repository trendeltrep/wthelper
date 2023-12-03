import { Body, Controller,Delete,Get,Param,Patch,Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CookService } from './cook.service';
import { AddCookDto, UpdateCookDto } from './dto';

@Controller('cook')
export class CookController {
    constructor (private cookService: CookService){}

        @Post('add')
        async addCook(
            @Body() addCookDto: AddCookDto
            ){
                return this.cookService.addCook(addCookDto)
            }

        @Get()
        async getCooks(){
            return this.cookService.getAllCooks()
        }

        @Get(':id')
        async getById(
            @Param('id') id:string){
                return this.cookService.getById(id)
        }

        @Patch(':id')
        async update(
            @Param('id') id:string,
            @Body() body : UpdateCookDto
        ){
            return this.cookService.update(id,body)

        }

        @Delete(':id')
        async delete(@Param('id') id:string){
            return this.cookService.delete(id)
        }
}
