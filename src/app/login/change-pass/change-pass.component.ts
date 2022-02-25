import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerhttpService } from 'src/app/services/serverhttp.service';
import { Employee, employeeLogin } from '../login.component';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  formChangePass= new FormGroup({
    oldPassword: new FormControl(null,[Validators.required, Validators.minLength(8)]),
    newPassword: new FormControl(null,[Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(null,[Validators.required, Validators.minLength(8)])
  });
  employee: EmployeeChangePass;
  employeeChange: employeeLogin;
  message;
  constructor(private service: ServerhttpService) { }

  ngOnInit() {
  }
  changePass(){
    this.employee=this.formChangePass.value;
    this.employee.username= localStorage.getItem('username');
    this.service.changePass(this.employee).subscribe((data)=>{
      this.employeeChange= data;
      console.log(data);
      if(this.employeeChange.token!=null){
        localStorage.clear();
        localStorage.setItem('username', this.employeeChange.username);
        localStorage.setItem('id',this.employeeChange.id);
        localStorage.setItem('token',this.employeeChange.token);
        console.log(localStorage.getItem('username'));
        this.formChangePass.reset();
        this.message=this.employeeChange.message;
      }
      else{
        this.formChangePass.reset();
        this.message=this.employeeChange.message;
      }

    console.log(data);
    })
    // this.service.
  }

}
export interface EmployeeChangePass {
  username: string;
  oldPassword: string;
  newPassword: string;
}
