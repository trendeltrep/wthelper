import { OrderStatus } from "src/constants/enum";

export class CreateOrderDto {
    totalWaitTime: number;
    status:OrderStatus;
    totalPrice:number;
    tip:number;
    customerId:string;
    waiterId:string;
    dishId:string;
    tableId:string;
}