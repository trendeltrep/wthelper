import { WaiterRole } from "src/constants/enum";

export class WaiterSignUpDto {
    email: string;
    phoneNumber: string;
    waiterName: string;
    password:string;
    role: WaiterRole
}