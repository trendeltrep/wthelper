import { Injectable,ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddTableDto } from './dto';

@Injectable()
export class TableService {
    constructor (private prisma:PrismaService){}

    async addTable(dto:AddTableDto){
        const admin = await this.prisma.waiter.findFirst({
            where: {id:dto.waiterId}
        })

        switch (admin.role){
            case 'WAITER':
                throw new ForbiddenException('You are not ADMIN')
            case 'ADMIN':
                const result = await this.prisma.table.create({data:{
                    seats:dto.seats,
                    status:'FREE'
                }})
                return result
        }

    }

    async getTables(){
        return this.prisma.table.findMany()
    }
}
