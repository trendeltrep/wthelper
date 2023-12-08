import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TableService } from './table.service';
import { AuthGuard } from 'src/api/auth/auth.guard';
import { AddTableDto } from './dto';
import { UpdateTableDto } from './dto/update-table.dto';

@UseGuards(AuthGuard)
@Controller('table')
export class TableController {
    constructor (private tableService:TableService){}
    
    
    @Post('add')
    async addTable(
        @Body() dto:AddTableDto){
            return this.tableService.addTable(dto)
        }

    @Get()
    async getTables(){
        return this.tableService.getTables()
    }

    @Get(':id')
    async getById(
        @Param('id') id:string){
            return this.tableService.getById(id)
    }

    @Patch(':id')
    async update(
        @Param('id') id:string,
        @Body() body : UpdateTableDto
    ){
        return this.tableService.update(id,body)

    }

    @Delete(':id')
    async delete(@Param('id') id:string){
        return this.tableService.delete(id)
    }

}
