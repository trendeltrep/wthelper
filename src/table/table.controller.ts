import { Body, Controller, Get, Post } from '@nestjs/common';
import { TableService } from './table.service';
import { AddTableDto } from './dto';

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
}
