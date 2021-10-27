import { Department } from "./department";
import { Manager } from "./manager";

export class Employee {
    id: number=0;
    firstName: string="";
    lastName: string="";
    email: string="";
    phoneNumber: string="";
    hireDate: Date | undefined;
    salary: number=0;
    department: Department= new Department();
    manager: Manager = new Manager();
}