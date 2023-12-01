import { Body, Controller,Get,Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CookService } from './cook.service';
import { AddCookDto } from './dto';

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
}
