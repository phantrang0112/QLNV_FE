import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
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
  totalPagination: number;
  message;
  numberItem;
  indexPagination=1;
  page_size=5;
  pageEvent: PageEvent;
  searchGroup= new FormGroup(
    {search:new FormControl(),}

  );


  constructor(private service: AppserviceService,private serverHttp: ServerhttpService,private router: Router){
    // this.employee= service.employee;
  }
  displayedColumns: string[] = [ 'stt','img','name', 'phone','age','about'];

  dataSource ;


  ngOnInit(): void {
    // this.serverHttp.getProfile().subscribe((data)=> {
    //   console.log(data);
    //    this.employee= data;
    //   this.dataSource = new MatTableDataSource<Employee>(this.employee)
    //   this.numberItem= this.employee.length;
    //   console.log(this.numberItem)

    // });
      this.serverHttp.getEmployeePage(this.indexPagination,this.page_size).subscribe((data)=>{
        this.listEmployeePaging=data;
        this.numberItem= this.listEmployeePaging.total;
        this.dataSource =this.listEmployeePaging.list;
        if ((this.listEmployeePaging.total /this.page_size) >1) {
          this.totalPagination = this.indexPagination + 1;
        }

      })
  }
  // Load lại data
  private loadData(){
    this.indexPagination = 1;
    this.ngOnInit();
    //window.location.reload();
    // this.serverHttp.getProfile().subscribe((data)=> {
    //   console.log(data);

    //   this.employee= data;
    //   this.numberItem= this.employee.length;
    //   this.dataSource = new MatTableDataSource<Employee>(this.employee)
    //   //
    // });
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

  indexPaginationChage(value: number) {
    this.indexPagination = value;
  }
  findPaginnation() {
    if (this.totalPagination <(this.listEmployeePaging.total /this.page_size) ) {
      this.totalPagination += 1;
      if(this.indexPagination<this.totalPagination){
        this.indexPagination+=1;
      }
    }else{
      this.indexPagination=this.totalPagination;
    }
    this.serverHttp.getEmployeePage(this.indexPagination,this.page_size).subscribe((data)=>{
      this.listEmployeePaging=data;
      this.dataSource =this.listEmployeePaging.list;
    })
  }
  firtPage() {
    this.indexPagination = 1;
    this.ngOnInit();
  }

  // nextPage() {
  //   this.indexPagination = this.indexPagination + 1;
  //   if (this.indexPagination > this.totalPagination) {
  //     this.indexPagination = this.indexPagination - 1;
  //   }
  //   this.serverHttp.getEmployeePage(this.indexPagination,this.page_size).subscribe((data)=>{
  //     this.listEmployeePaging=data;
  //     this.dataSource =this.listEmployeePaging.list;
  //   })
  // }

  prviousPage() {
    if(this.totalPagination > this.indexPagination){
      this.totalPagination=this.totalPagination-1;
    }
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination == 0) {
      this.indexPagination = 1;
      this.ngOnInit();
    } else {
      this.serverHttp.getEmployeePage(this.indexPagination,this.page_size).subscribe((data)=>{
        this.listEmployeePaging=data;
        this.dataSource =this.listEmployeePaging.list;
        })
    }
  }

  lastPage() {
    if((this.listEmployeePaging.total % this.page_size)!=0){
      this.indexPagination = Math.round( this.listEmployeePaging.total / this.page_size)+1;
      this.totalPagination=this.indexPagination;
    }
    else{
      this.indexPagination = this.listEmployeePaging.total / this.page_size;
      this.totalPagination=this.indexPagination;
    }

    this.serverHttp.getEmployeePage(this.indexPagination,this.page_size).subscribe((data)=>{
      this.listEmployeePaging=data;
      this.dataSource =this.listEmployeePaging.list;
      })
  }
  search(){
    if(!this.searchGroup.controls.search.value){
      this.serverHttp.getEmployeesSearch(this.searchGroup.controls.search.value,this.indexPagination, this.page_size).subscribe((data)=>{
        this.listEmployeePaging=data;
        this.numberItem= this.listEmployeePaging.total;
        this.dataSource =this.listEmployeePaging.list;
        console.log("ghjasgj");
        if ((this.listEmployeePaging.total /this.page_size) >1) {
          this.totalPagination = this.indexPagination + 1;
        }

      })
    }
    else{
      this.loadData();
    }
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
  list:Array<Employee>,
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

