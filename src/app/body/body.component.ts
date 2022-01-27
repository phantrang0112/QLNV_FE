import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppserviceService } from '../services/appservice.service';
import { ServerhttpService } from '../services/serverhttp.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  employee;
  listEmployeePaging: paging;
  message;
  numberItem;
  constructor(private service: AppserviceService,private serverHttp: ServerhttpService,private router: Router){
    // this.employee= service.employee;
  }
  displayedColumns: string[] = [ 'stt','img','name', 'phone','age','about'];

  dataSource ;


  ngOnInit(): void {
    this.serverHttp.getProfile().subscribe((data)=> {
      console.log(data);
      this.employee= data;
      this.numberItem= this.employee.length;
      console.log(this.numberItem)
      this.dataSource = new MatTableDataSource<Employee>(this.employee)
    });

  }
  // Load lại data
  private loadData(){
    //window.location.reload();
    this.serverHttp.getProfile().subscribe((data)=> {
      console.log(data);

      this.employee= data;
      this.numberItem= this.employee.length;
      this.dataSource = new MatTableDataSource<Employee>(this.employee)
      //
    });
  }
  public tangTuoi(){
    this.service.numberItem++;
    this.employee[0].age=this.service.numberItem;
  }
  //Xóa 1 nhân viên
  public xoaEmployee(employeeId){
    console.log(employeeId);
    this.serverHttp.deleteEmployee(employeeId).subscribe((data)=>{
      console.log('delete',data);
      this.message="xóa thành công!";
      this.loadData();
    })
  }
  public getEmployeePaging(page, page_size){
    this.serverHttp.getEmployeePage(page,page_size).subscribe((data)=>{
      this.listEmployeePaging=data;
      this.dataSource =this.listEmployeePaging.list;
    })
  }
  public editEmployee(employeeId){
    this.router.navigate(['employeeForm',employeeId]);// sử dụng dịch vụ router để chuyển hướng
  }
}
export interface Employee {
  stt: number;
  name: string;
  phone: string;
  addess: string;
  age: string;
  img: string;
}
export interface paging {
  total: number,
  list:Employee,
  pageNum: number,
  pageSize: number,
  size: number,
  startRow: number,
  endRow: number,
  pages: number,
  prePage: number,
  nextPage: number,
  isFirstPage: boolean,
  isLastPage: boolean,
  hasPreviousPage: boolean,
  hasNextPage: boolean,
  navigatePages: number,
  navigatepageNums,
  navigateFirstPage: number,
  navigateLastPage: number
}

