import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
//  public name=  new FormControl('');
  addEmployeeForm = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
  });
  constructor() { }

  ngOnInit() {
  }
  // public updateName(){
  //   this.name.setValue("Phan Thi TRang")
  // }
  public onSubmit(){
    console.log("hi trang");
  }
}
