import { Body, Controller,Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CookService } from './cook.service';

@Controller('cook')
export class CookController {
    constructor (private cookService: CookService){}

        @Post('add')
        async addCook(
            @Body() addCookDto: any
            ){

            }
}
