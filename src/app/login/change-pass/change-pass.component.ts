import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerhttpService } from 'src/app/services/serverhttp.service';

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
  constructor(private service: ServerhttpService) { }

  ngOnInit() {
  }
  changePass(){
    this.employee=this.formChangePass.value;
    this.employee.username= localStorage.getItem('username');

    // this.service.
  }

}
export interface EmployeeChangePass {
  username: string;
  oldPassword: string;
  newPassword: string;
}
