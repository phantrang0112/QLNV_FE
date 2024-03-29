import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppserviceService } from 'src/app/services/appservice.service';
import { ServerhttpService } from 'src/app/services/serverhttp.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  // title="Danh sách nhân viên";

  employee;
  loginMode;
  constructor(private appService: AppserviceService, private serverHttp: ServerhttpService,private route: Router) {

   }


  ngOnInit() {
    // this.appService.setTitel(this.title);
    this.loginMode=this.appService.btnLogin();
    // this.numberItem= this.appService.tongSoNhanVien();
  }
  ngDoCheck(){
    this.ngOnInit();
    this.loginMode=this.appService.btnLogin();
  }
  home(){
    // document.getElementById("home").classList.add('active');
  }
  listemployee(){
    // $("a").removeClass('active');
    // $('listemployee').add('active');
    // document.getElementById("listemployee").classList.add('active');
  }
  routerLogin(){

    this.appService.setTitel("Login");
    if(this.appService.loginMode){
      this.route.navigate(['form-login']);
      this.loginMode=this.appService.btnLogin();
    }
    else{

      localStorage.removeItem('username');
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      this.appService.onSwitch();
      this.loginMode=this.appService.btnLogin();
      this.route.navigate(['form-login']);

    }
  }
  myAccount(){
    this.route.navigate(['employee-form',localStorage.getItem('id')])
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }


}
