import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WaiterService } from './waiter.service';

@Controller('waiter')
export class WaiterController {
    constructor(private waiterService:WaiterService){}

    @Get()
    async getAllWaiter(){
        return this.waiterService.getWaiters()
    }
}
