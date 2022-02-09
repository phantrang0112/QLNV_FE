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
  constructor(private serverHttp: ServerhttpService,private route: Router, private appService: AppserviceService) { }
  ngOnInit() {
  }
  public login(){
    this.employee= this.formLogin.value;
    console.log( this.employee);
    this.serverHttp.login(this.employee).subscribe((data)=>{
    this.employeeAPI= data;

      if(this.employeeAPI.statusCode!=0){
        localStorage.setItem('username', this.employeeAPI.username);
        console.log(localStorage.getItem('username'))
        this.route.navigate(['']);
        this.message=this.employeeAPI.message;
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
  statusCode: number;
  username: string;
}
