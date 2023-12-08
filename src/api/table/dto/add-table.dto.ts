import { TableStatus } from "@prisma/client";

export class AddTableDto{
    waiterId: string;
    seats:number;
}