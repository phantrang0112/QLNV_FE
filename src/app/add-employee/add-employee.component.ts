import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../login/login.component';
import { AppserviceService } from '../services/appservice.service';
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
  id=0;
  titel="Thêm nhân viên";
  addEmployeeForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    img:new FormControl('',[Validators.required]),
    age: new FormControl('',[Validators.required,Validators.min(1),Validators.max(100)]),
    phone: new FormControl('',[Validators.required,Validators.maxLength(10), Validators.minLength(10)]),
  });
  constructor(private serverHttp: ServerhttpService,private route:ActivatedRoute, private router:Router, private appService:AppserviceService) { }

  ngOnInit() {
    this.appService.setTitel(this.titel);
    this.id=+this.route.snapshot.paramMap.get('id');// Lấy giá trị tại ô id( muốn đổi từ String thành số thêm dấu "+ "đằng trước)
    if(this.id>0){
      this.loadData(this.id);
    }

  }
  //Load dữ liệu lên form trong trường hợp edit
  private loadData(id){
    console.log('loaddata',id);
    this.serverHttp.getEmployeeId(id).subscribe((data)=>{
      for(const controlName in this.addEmployeeForm.controls){
        if(controlName){
          this.addEmployeeForm.controls[controlName].setValue(data[controlName]);
        }
      }
    }
    )
  }

  public addEmployee(){
    this.newEmployee=this.addEmployeeForm.value;
    let id= +localStorage.getItem('id');
    console.log(id);
    //nếu có tồn tại id thì sửa
    if(this.id>0){
      if(this.id===id){
        this.serverHttp.editEmployee(this.id,this.newEmployee).subscribe((data)=>{
          console.log(data);
          this.message="cập nhật thông tin thành công";

          this.loadData(this.id);
        })
      }
      else(
      this.serverHttp.editEmployee(this.id,this.newEmployee).subscribe((data)=>{
        console.log(data);
        this.message="cập nhật nhân viên thành công";
        this.router.navigate(['']);// sử dụng dịch vụ router để chuyển hướng về trang chủ sau khi chỉnh sửa.
      })
      )

    }
    else{// nếu id bằng 0 thì thêm vào

      this.serverHttp.postEmployee(this.newEmployee).subscribe((data)=>{
        console.log(data);
        this.addEmployeeForm.reset();
        this.message="thêm thành công";
      })
      }
      this.appService.setMessage(this.message);
    }



  public onSubmit(){
    console.log("hi trang");
  }
  changeImg(){
    
    let id= +localStorage.getItem('id');
    if(id==0){
      this.message="Tài khoản chưa xác thực"
    }
    else{
      this.router.navigate(['changeImg',this.id]);
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

