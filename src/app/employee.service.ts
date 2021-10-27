import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:9090/';
  private employeeService= this.baseUrl + "employee/"
  private saveEmployee= this.employeeService + "save-employee"
  private getEmployees= this.employeeService + "get-employees"
  private updateEmployee= this.employeeService + "update-employee"
  private deleteEmployeeUrl= this.employeeService + "delete-employee"
  private getDepartmentsUrl= this.employeeService + "get-departments"
  private getManagersUrl= this.employeeService + "get-managers"
  private findEmployeeUrl= this.employeeService + "find-employee"


  constructor(private http: HttpClient) { }


  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.saveEmployee}`, employee);
  }

  updateEmployeeData(employee: Object): Observable<Object> {
    return this.http.post(`${this.updateEmployee}`, employee);
  }

  getEmployee(page: number,size:number):Observable<any> {
    return this.http.get(`${this.getEmployees}` + '?page=' + page + '&size=' + size);
  }

  getDepartments():Observable<any> {
    return this.http.get(`${this.getDepartmentsUrl}`);
  }

  getManagers():Observable<any> {
    return this.http.get(`${this.getManagersUrl}`);
  }
  
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.deleteEmployeeUrl}?employeeId=${id}`);
  }

  findEmployee(id: number): Observable<any> {
    return this.http.get(`${this.findEmployeeUrl}?employeeId=${id}`);
  }

}
