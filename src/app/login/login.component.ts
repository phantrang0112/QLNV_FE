import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { AppserviceService } from '../services/appservice.service';
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
  titel="Login";
  constructor(private serverHttp: ServerhttpService,private route: Router, private appService: AppserviceService) { }
  ngOnInit() {
    this.appService.setTitel(this.titel);
    console.log(this.appService.getTitel())
  }
  public login(){
    this.employee= this.formLogin.value;
    console.log( this.employee);
    this.serverHttp.generateToken(this.employee).subscribe((data)=>{
    this.employeeAPI= data;
      console.log(data);
      if(this.employeeAPI.token!=null){
        localStorage.setItem('username', this.employeeAPI.username);
        localStorage.setItem('id',this.employeeAPI.id);
        localStorage.setItem('token',this.employeeAPI.token);
        console.log(localStorage.getItem('username'))
        this.route.navigate(['']);
        this.message=this.employeeAPI.message;
        this.appService.setMessage(this.message);
        this.appService.onSwitch();
        console.log(this.appService.loginMode);
      }
      else{
        this.formLogin.reset();
        this.message=this.employeeAPI.message;
      }

    console.log(data);

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
}
