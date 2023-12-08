import { OrderStatus } from "src/constants/enum";

export class UpdateOrderDto{
    status: OrderStatus;
    tip: number;
    customerId: string;
    waiterId: string;
    tableId: string;
}