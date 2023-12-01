import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService){}


    @Get()
    async getAllCustomers(){
        return this.customerService.getCustomers()
    }
}
