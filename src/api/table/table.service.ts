import { Injectable,ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddTableDto } from './dto';
import { UpdateTableDto } from './dto/update-table.dto';

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

    async getById(id){
        return this.prisma.table.findFirst({where:{id:id}})
    }

    async update(id,body:UpdateTableDto){
        return this.prisma.table.update({where : {id:id},
        data:{
            seats:body.seats,
            status:body.status,
        }})
    }

    async delete(id){
        await this.prisma.table.delete({where:{id}})
    }
}
