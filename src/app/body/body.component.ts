import { Component, OnInit } from '@angular/core';
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
  message;

  constructor(private service: AppserviceService,private serverHttp: ServerhttpService,private router: Router){
    // this.employee= service.employee;
  }

  ngOnInit(): void {
    this.serverHttp.getProfile().subscribe((data)=> {
      console.log(data);
      this.employee= data;
    });
  }
  private loadData(){
    this.serverHttp.getProfile().subscribe((data)=> {
      console.log(data);
      this.employee= data;
    });
  }
  public tangTuoi(){
    this.service.numberItem++;
    this.employee[0].age=this.service.numberItem;
  }
  public xoaEmployee(employeeId){
    this.serverHttp.deleteEmployee(employeeId).subscribe((data)=>{
      console.log('delete',data);
      this.message="xóa thành công!";
      this.loadData();
    })
  }
  public editEmployee(employeeId){
    this.router.navigate(['employeeForm',employeeId]);// sử dụng dịch vụ router để chuyển hướng
  }
}
