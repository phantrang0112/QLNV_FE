import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppserviceService } from 'src/app/services/appservice.service';
import { ServerhttpService } from 'src/app/services/serverhttp.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title="Danh sách nhân viên";

  employee;
  loginMode;
  constructor(private appService: AppserviceService, private serverHttp: ServerhttpService,private route: Router) {

   }


  ngOnInit() {
    this.loginMode=this.appService.btnLogin();
    console.log(this.loginMode);
    // this.numberItem= this.appService.tongSoNhanVien();
  }
  routerLogin(){
    if(this.appService.loginMode){
      this.route.navigate(['formLogin']);
      this.loginMode=this.appService.btnLogin();
    }
    else{
      localStorage.removeItem('username');
      localStorage.removeItem('id');
      this.route.navigate(['formLogin']);
    }

  }
  myAccount(){
    this.route.navigate(['employeeForm',localStorage.getItem('id')])
  }

}
