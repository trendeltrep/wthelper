import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CookService {
    constructor (private prisma:PrismaService){}

    async addCook(dto:any){
        
    }

}
