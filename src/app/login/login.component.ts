import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { AppserviceService } from '../services/appservice.service';
import { NotifyService } from '../services/notify.service';
import { ServerhttpService } from '../services/serverhttp.service';
import { HeaderComponent } from '../share/header/header.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   formLogin= new FormGroup({
    username: new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)]),

  });
  employee: Employee;
  employeeAPI: employeeLogin;
  message;
  loading=false;
  title="Login";
  constructor(private serverHttp: ServerhttpService,private route: Router, private appService: AppserviceService, private notify: NotifyService) { }
  ngOnInit() {
    this.appService.setTitel(this.title);
    // console.log(this.appService.getTitle())
  }
  public login(){
    this.employee= this.formLogin.value;
    this.serverHttp.generateToken(this.employee).subscribe((data)=>{
    this.employeeAPI= data;
      if(this.employeeAPI.token!=null){
        localStorage.setItem('username', this.employeeAPI.username);
        localStorage.setItem('id',this.employeeAPI.id);
        localStorage.setItem('token',this.employeeAPI.token);
        localStorage.setItem('role',this.employeeAPI.role);
        this.notify.notifySuccessToggerMessage('Login success!!!')
        this.route.navigate(['']);
        this.appService.onSwitch();
      }
      else{
        this.formLogin.reset();
        this.notify.notifiError('Error',this.employeeAPI.message);
      }
    })
  }
  matcher1 = new MyErrorStateMatcher();
}

export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export interface Employee {
  username: string;
  password: string;
}
export interface employeeLogin {
  message: string;
 token: string;
  username: string;
  id: string;
  role:string;
}
