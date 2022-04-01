import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Employee } from '../body/body.component';
import { AppserviceService } from '../services/appservice.service';
import { NotifyService } from '../services/notify.service';
import { ServerhttpService } from '../services/serverhttp.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  //  public name=  new FormControl('');
  employee: Employee;
  message;
  newEmployee: Employee;
  id = 0;
  img;
  title= "Add Employee";
 display = false;
  addEmployeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    img: new FormControl(),
    age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email,Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])
  });
  constructor(private serverHttp: ServerhttpService, private route: ActivatedRoute, private router: Router, private appService: AppserviceService,private notify:NotifyService) {
  }

  async ngOnInit() {
    this.appService.setTitel(this.title);
    this.id = +this.route.snapshot.paramMap.get('id');// Lấy giá trị tại ô id( muốn đổi từ String thành số thêm dấu "+ "đằng trước)
   let trang=localStorage.getItem('name');
    if (localStorage.getItem('role') == 'ADMIN') {
      this.display = false;
      if(+localStorage.getItem('id')==this.id){
        this.title="My Account";
        this.loadData(this.id);

      }else if (this.id > 0) {
        this.title="Employee";
        this.loadData(this.id);

      }
    }
      else {
        if(+localStorage.getItem('id')==this.id){
          this.title="My Account";
          this.loadData(this.id);

        }
        else{
          this.notify.blockPermission();
          this.display = true;
          await new Promise(f => setTimeout(f, 1000));
          this.router.navigate(['']);
        }

      }



    this.appService.setCheck(false);

  }
  // ngDoCheck(){
  //   this.appService.setTitel(this.title);
  // }
  //Load dữ liệu lên form trong trường hợp edit
  private loadData(id) {
    this.serverHttp.getEmployeeId(id).subscribe((data) => {
      for (const controlName in this.addEmployeeForm.controls) {
        if (controlName) {

          this.addEmployeeForm.controls[controlName].setValue(data[controlName]);
        }
      }
    }
    )
  }

  public addEmployee() {
    this.newEmployee = this.addEmployeeForm.value;
    let id = +localStorage.getItem('id');
      //nếu có tồn tại id thì sửa
      if (this.id > 0) {

        if (this.id == id) {
          this.serverHttp.editEmployee(this.id, this.newEmployee).subscribe((data) => {
            this.notify.notifySuccessToggerMessage('Update success!');
            this.loadData(this.id);
          })
        }
        else (
          this.serverHttp.editEmployee(this.id, this.newEmployee).subscribe((data) => {
            this.notify.notifySuccessToggerMessage('Employee update successful!');
            this.loadData(this.id);
            // this.router.navigate(['']);// sử dụng dịch vụ router để chuyển hướng về trang chủ sau khi chỉnh sửa.
          })
        )

      }
      else {// nếu id bằng 0 thì thêm vào
        this.newEmployee.img='avt.jpg';
        this.serverHttp.postEmployee(this.newEmployee).subscribe((data) => {
          this.message = "add staff successfully";
          this.notify.notifySuccess('Success','add staff successfully','list-employee');
        })
      }
      this.appService.setMessage(this.message);
  }



  public onSubmit() {
    console.log("hi trang");
  }
  changeImg() {

    let id = this.id;
    if (id == 0) {
      this.notify.notifiError('Error',"Unverified account");
    }
    else {
      this.router.navigate(['change-img', this.id]);
    }
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
}
export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}

