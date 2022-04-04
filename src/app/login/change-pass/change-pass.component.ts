import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppserviceService } from 'src/app/services/appservice.service';
import { NotifyService } from 'src/app/services/notify.service';
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
  constructor(private service: ServerhttpService, private appService: AppserviceService, private notify:NotifyService) { }
  title="Change pass";
  ngOnInit() {
    this.appService.setTitel(this.title);
  }
  changePass(){
    this.employee=this.formChangePass.value;
    console.log(this.employee);
    if(this.employee.newPassword!=null && this.employee.oldPassword!=null){
      this.employee.username= localStorage.getItem('username');
    this.service.changePass(this.employee).subscribe((data)=>{
      this.employeeChange= data;
      if(this.employeeChange.token!=null){
        localStorage.clear();
        localStorage.setItem('username', this.employeeChange.username);
        localStorage.setItem('id',this.employeeChange.id);
        localStorage.setItem('token',this.employeeChange.token);
        this.notify.notifySuccess('Success','home',this.employeeChange.message);
             }
      else{
        this.notify.notifiError('Error',this.employeeChange.message);
        this.formChangePass.reset();
      }
    })
    }
    else{
      this.notify.notifiError('Error','blank password');
      this.formChangePass.reset();
    }

    // this.service.
  }

}
export interface EmployeeChangePass {
  username: string;
  oldPassword: string;
  newPassword: string;
}
