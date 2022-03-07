import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { Employee } from 'src/app/body/body.component';
import { AppserviceService } from 'src/app/services/appservice.service';
import { ServerhttpService } from 'src/app/services/serverhttp.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister= new FormGroup({
    username: new FormControl(null,[Validators.required]),
    phone: new FormControl(null,[Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{3})(?: *x(\\d+))?\\s*$')
  ]),
    address: new FormControl(null,[Validators.required]),
    name: new FormControl(null,[Validators.required]),
    age: new FormControl(null,[Validators.required]),
    email: new FormControl(null,[Validators.required,Validators.email])
  })
  title="Register";
  message="";
  constructor(private service: ServerhttpService, private route: Router, private appService: AppserviceService) { }

  ngOnInit() {
    this.appService.setTitel(this.title);
  }
  registe(){
    let newEmployee: Employee;
    newEmployee=this.formRegister.value;
    this.service.register(newEmployee).subscribe((data)=>{
        console.log(data);
      if(data!=null){
          this.message="Đăng kí thành công";
          this.route.navigate(['formLogin']);
        }
    })
    console.log(this.formRegister.value);
    this.formRegister.reset();
  }

}

