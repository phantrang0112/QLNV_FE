import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppserviceService } from '../services/appservice.service';
import { ServerhttpService } from '../services/serverhttp.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy {
  employee;
  listEmployeePaging: paging;
  totalPagination: number;
  message;
  numberItem;
  indexPagination = 1;
  page_size = 5;
  pageEvent: PageEvent;
  searchCheck = false;
  searchGroup = new FormGroup(
    { search: new FormControl(), }

  );
  title = "List Employee";


  constructor(private service: AppserviceService, private serverHttp: ServerhttpService, private router: Router) {
    // this.employee= service.employee;
  }
  displayedColumns: string[] = ['stt', 'img', 'name', 'phone', 'age', 'about'];

  dataSource;
  token;

  ngOnInit(): void {
    this.service.setTitel(this.title);
    // this.serverHttp.getProfile().subscribe((data)=> {
    //   console.log(data);
    //    this.employee= data;
    //   this.dataSource = new MatTableDataSource<Employee>(this.employee)
    //   this.numberItem= this.employee.length;
    //   console.log(this.numberItem)

    // });
    this.token = localStorage.getItem('token');
    this.indexPagination=1;
    this.serverHttp.getEmployeePage(this.indexPagination, this.page_size, this.token).subscribe((data) => {
      this.listEmployeePaging = data;
      this.numberItem = this.listEmployeePaging.total;
      this.dataSource = this.listEmployeePaging.list;
      if ((this.listEmployeePaging.total / this.page_size) > 1) {
        this.totalPagination = this.indexPagination + 1;
      }

    })
  }
  private loadListEmployees(index: number, page_size: number) {
    console.log(this.searchCheck);
    if (this.searchCheck == false) {
      this.serverHttp.getEmployeePage(index, page_size, this.token).subscribe((data) => {
        this.listEmployeePaging = data;
        // if ((this.listEmployeePaging.total / page_size) > 1) {
        //   if( this.totalPagination<(this.listEmployeePaging.total / this.page_size) ){
        //     this.totalPagination = index + 1;
        //   }
        //   else{
        //     this.totalPagination = index;
        //   }

        // }
        // else {
        //   this.totalPagination = index;
        // }
        this.dataSource = this.listEmployeePaging.list;
        console.log(this.listEmployeePaging);

      })
    }
    else {
      this.serverHttp.getEmployeesSearch(this.searchGroup.controls.search.value, index, page_size).subscribe((data) => {
        this.listEmployeePaging = data;
        this.dataSource = this.listEmployeePaging.list;
        console.log(this.listEmployeePaging);
      })
    }
    this.numberItem=this.listEmployeePaging.total;
    console.log(this.numberItem);
    console.log(this.totalPagination, this.indexPagination);
    return this.dataSource;
  }
  ngOnDestroy() {
    this.service.setCheck(true);

  }
  // Load lại data
  private loadData() {
    this.indexPagination = 1;
    // this.ngOnInit();
    this.loadListEmployees(this.indexPagination, this.page_size);

  }
  public tangTuoi() {
    this.service.numberItem++;
    this.employee[0].age = this.service.numberItem;
  }
  //Xóa 1 nhân viên
  public xoaEmployee(employeeId) {

    if (localStorage.getItem('role') == 'ADMIN') {
      console.log(employeeId);
      // let choice =this.confirmDelete();
      // console.log(choice);
      Swal.fire({
        title: 'Are you sure you want to delete?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.serverHttp.deleteEmployee(employeeId).subscribe((data) => {
            console.log('delete', data);
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.ngOnInit();
          }
          )
        }
        else{
          Swal.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }

      })
    }
    else {
      Swal.fire(
        'Cancelled',
        'not have access :)',
        'error'
      )
      // this.message = 'not have access';
    }


  }
  confirmDelete(){
    let check:boolean;
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )

      }
      else{
        check= false;
      }
    })
    console.log(check);
    return check;
  }
  //Lấy dữ liệu cho trang đầu tiên
  public getEmployeePaging(page, page_size) {
    this.dataSource = this.loadListEmployees(page, page_size);

  }
  //Click chỉnh sửa nhân viên
  public editEmployee(employeeId) {
    this.title = "Chỉnh sửa nhân viên";
    this.service.setTitel(this.title);
    this.router.navigate(['employee-form', employeeId]);// sử dụng dịch vụ router để chuyển hướng
  }
  //thay đổi số trang
  indexPaginationChage(value: number) {
    this.indexPagination = value;
  }
  //Trang kế tiếp
  findPaginnation() {
    console.log(this.listEmployeePaging.total / this.page_size+"tong"+this.totalPagination)

    if (this.totalPagination < (this.listEmployeePaging.total / this.page_size)) {
      this.totalPagination ++;
      if (this.indexPagination < this.totalPagination) {
        this.indexPagination += 1;
      }
    } else {
      this.indexPagination = this.totalPagination;
    }
    this.dataSource = this.loadListEmployees(this.indexPagination, this.page_size);
  }
  //Trang đầu tiên
  firtPage() {
    this.indexPagination = 1;
    this.totalPagination= this.indexPagination+1;
    this.dataSource = this.loadListEmployees(this.indexPagination, this.page_size);
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
  // Trang trước đó
  prviousPage() {
    if (this.totalPagination > this.indexPagination) {
      this.totalPagination = this.totalPagination - 1;
    }
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination == 0) {
      this.indexPagination = 1;
      this.dataSource = this.loadListEmployees(this.indexPagination, this.page_size);
    } else {
      this.dataSource = this.loadListEmployees(this.indexPagination, this.page_size);
    }
  }
  // Trang cuối cùng
  lastPage() {
    if ((this.listEmployeePaging.total % this.page_size) != 0) {
      this.indexPagination = Math.round(this.listEmployeePaging.total / this.page_size) + 1;
      this.totalPagination = this.indexPagination;
    }
    else {
      this.indexPagination = this.listEmployeePaging.total / this.page_size;
      this.totalPagination = this.indexPagination;
    }

    this.dataSource = this.loadListEmployees(this.indexPagination, this.page_size);
  }
  search() {
    console.log(this.searchGroup.controls.search.value);
    this.searchCheck = true;
    if (this.searchGroup.controls.search.value) {
      this.serverHttp.getEmployeesSearch(this.searchGroup.controls.search.value, this.indexPagination, this.page_size).subscribe((data) => {
        this.listEmployeePaging = data;
        console.log(data);
        this.dataSource = this.listEmployeePaging.list;
        if ((this.listEmployeePaging.total / this.page_size) > 1) {
          this.totalPagination = this.indexPagination + 1;
        }
        else {
          this.totalPagination = this.indexPagination;
        }

      })
    }
    else {
      this.searchCheck = false;
      this.loadData();
    }
  }
}
export interface Employee {
  stt: number;
  id: number;
  name: string;
  phone: string;
  addess: string;
  age: string;
  img: string;
  pass: string;
  username: string;
  email:string;
}
export interface paging {
  total: number,
  list: Array<Employee>,
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

