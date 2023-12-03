import { TableStatus } from "@prisma/client";

export class UpdateTableDto{
    seats:number;
    status:TableStatus;
}