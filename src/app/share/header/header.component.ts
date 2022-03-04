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
  // title="Danh sách nhân viên";

  employee;
  loginMode;
  constructor(private appService: AppserviceService, private serverHttp: ServerhttpService,private route: Router) {

   }


  ngOnInit() {
    // this.appService.setTitel(this.title);
    this.loginMode=this.appService.btnLogin();
    console.log(this.loginMode);
    // this.numberItem= this.appService.tongSoNhanVien();
  }
  ngDoCheck(){

  }
  routerLogin(){

    this.appService.setTitel("Login");
    if(this.appService.loginMode){
      this.route.navigate(['formLogin']);
      this.loginMode=this.appService.btnLogin();
    }
    else{
      localStorage.removeItem('username');
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      this.route.navigate(['formLogin']);
    }
  }
  myAccount(){
    this.route.navigate(['employeeForm',localStorage.getItem('id')])
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }


}
