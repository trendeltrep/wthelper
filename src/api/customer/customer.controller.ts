import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerLoginDto } from 'src/api/auth/dto';
import { AuthGuard } from 'src/api/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService){}


    @Get()
    async getAllCustomers(){
        return this.customerService.getCustomers()
    }
    
    @Get(':id')
    async getById(@Param('id') id: string){
        return this.customerService.getById(id)
    }

    @Patch(':id')
    async updateWaiter(
        @Param('id') id :string,
        @Body() body:CustomerLoginDto){
            return this.customerService.updateCustomer(id,body)
        }

    @Delete(':id')
    async delete(@Param('id') id:string){
        return this.customerService.deleteCustomer(id)
    }

}
