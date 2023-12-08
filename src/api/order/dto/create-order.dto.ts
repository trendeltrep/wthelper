
export class CreateOrderDto {
    tip?:number;
    customerId:string;
    waiterId:string;
    dishId:string[];
    tableId:string;
}