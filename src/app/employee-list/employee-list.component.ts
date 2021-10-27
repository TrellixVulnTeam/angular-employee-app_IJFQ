import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService:EmployeeService,private toastr: ToastrService,private router: Router) { }

  employee: Employee = new Employee();

  employees: Employee[] = [];

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees()
  {
    this.employeeService.getEmployee(0,10).subscribe(data=>{
      if(data["data"] !=null && data["data"] !=undefined)
      {
        this.employees=data["data"];
      }else
      {
        this.employees=[];
      }
    })
  }

  deleteEmployee(id:number)
  {
    this.employeeService.deleteEmployee(id).subscribe(data=>{
      this.toastr.success("Employee is Deleted Successfuly !");
      this.getEmployees();
    })
  }

  employeeDetails(id:number)
  {
    this.router.navigate(['update', id]);
  }

}
