import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../employee.service';
import { Department } from '../models/department';
import { Employee } from '../models/employee';
import { Manager } from '../models/manager';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  constructor(private employeeService:EmployeeService,private toastr: ToastrService,private router: Router,private route: ActivatedRoute) { }

  submitted : boolean=false;
  employee:Employee = new Employee();
  departments:Department[]=[];
  managers:Manager[]=[];
  id :number=0;
  errorMessage:string[]=[];

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getDepartments();
    this.getManagers();
    this.getEmployee(this.id);
  }

  getEmployee(id :number)
  {
    this.employeeService.findEmployee(id).subscribe(data=>{

      if(data["data"] !=null && data["data"] !=undefined)
      {
        this.employee=data["data"];
      }
    })
  }

  updateEmployee(){

    this.validation();
    this.employeeService
    .updateEmployeeData(this.employee).subscribe({
      next: data => {
        this.toastr.success("Employee is updated Successfuly !");
        this.employee = new Employee();
        this.gotoList();

      },
      error: error => {
        this.errorMessage= error.error;
        console.error('There was an error!', error.error);
      }
    })
    
  }
  gotoList() {
    this.router.navigate(['/employees']);
  }

  public phoneOnlyValidator(event: any):boolean {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
     return false;
    }

    return true;
  }

  getDepartments()
  {
    this.employeeService.getDepartments().subscribe(data=>{

      if(data["data"] !=null && data["data"] !=undefined)
      {
        this.departments=data["data"];
      }
    })
  }

  getManagers()
  {
    this.employeeService.getManagers().subscribe(data=>{

      if(data["data"] !=null && data["data"] !=undefined)
      {
        this.managers=data["data"];
      }
    })
  }

  changeDepartment(e:any){
    this.employee.department.id=e.target.value;
  }

  changeManager(e:any){
    this.employee.manager.id=e.target.value;
  }

  validation() {

    if (this.employee.department.id == 0) {
      this.toastr.warning("Please Select Department");
      return;
    }

    if (!this.employee.hireDate) {
      this.toastr.warning("Please Select Hire Date");
      return;
    }

    if (this.employee.manager.id == 0) {
      this.toastr.warning("Please Select Manager");
      return;
    }

  }

}
