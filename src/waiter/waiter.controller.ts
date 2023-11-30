import { Controller } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('waiter')
export class WaiterController {
    constructor(private prisma:PrismaService){}

}
