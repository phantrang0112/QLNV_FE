import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { ServerhttpService } from '../services/serverhttp.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
//  public name=  new FormControl('');
  employee;
  message;
  addEmployeeForm = new FormGroup({
    name: new FormControl(''),
    address:new FormControl(''),
    img:new FormControl(''),
    age: new FormControl(''),
    phone: new FormControl(''),
  });
  constructor(private serverHttp: ServerhttpService) { }

  ngOnInit() {
    this.serverHttp.getProfile().subscribe((data)=> {
      console.log(data);
      this.employee= data;
    });
  }
  public addEmployee(){
    const newEmployee=this.addEmployeeForm.value;
     const eemployee=
      {
        name:'văn f',
        address:'quận 9',
        phone:'0291207102',
        img:'hinh1.jpg',
        age: null,

      }
      console.log(newEmployee);
      this.serverHttp.postEmployee(newEmployee).subscribe((data)=>{
        console.log(data);
        this.message="thêm thành công";
      })
      }
  public onSubmit(){
    console.log("hi trang");
  }
}
