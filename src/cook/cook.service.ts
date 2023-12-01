import { Injectable,ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCookDto } from './dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class CookService {
    constructor (private prisma:PrismaService){}

    async addCook(dto:AddCookDto){

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

}
