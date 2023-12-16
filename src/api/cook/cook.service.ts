import { Injectable,ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCookDto, UpdateCookDto } from './dto';

@Injectable()
export class CookService {
    constructor (private prisma:PrismaService){}

    async addCook(dto:AddCookDto){
        try{
            const admin = await this.prisma.waiter.findFirst({
                where: {id:dto.waiterId}
            })

        }
        catch(e){
            throw new ForbiddenException('Forbidden access')
        }
        const admin = await this.prisma.waiter.findFirst({
            where: {id:dto.waiterId}
        })

        switch (admin.role){
            case 'WAITER':
                throw new ForbiddenException('You are not ADMIN')
            case 'ADMIN':
                const result = await this.prisma.cook.create({
                    data:
                        {
                            cookName: dto.cookName,
                            ageExperience:dto.ageExperience,
                            phoneNumber:dto.phoneNumber
                        }
                })
                return result
            }

    }

    async getAllCooks(): Promise<any>{
        return this.prisma.cook.findMany()
    }

    async getById(id){
        return this.prisma.cook.findFirst({where:{id:id}})
    }

    async update(id,body:UpdateCookDto){
        return this.prisma.cook.update({where : {id:id},
        data:{
            ageExperience:body.ageExperience,
            cookName:body.cookName,
            phoneNumber: body.phoneNumber
        }})
    }

    async delete(id){
        await this.prisma.cook.delete({where:{id}})
    }

}
