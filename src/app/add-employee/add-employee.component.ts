import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  id=0;

  addEmployeeForm = new FormGroup({
    name: new FormControl(''),
    address:new FormControl(''),
    img:new FormControl(''),
    age: new FormControl(''),
    phone: new FormControl(''),
  });
  constructor(private serverHttp: ServerhttpService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.id=+this.route.snapshot.paramMap.get('id');// Lấy giá trị tại ô id( muốn đổi từ String thành số thêm dấu "+ "đằng trước)
    if(this.id>0){
      this.loadData(this.id);
    }
    // this.serverHttp.getProfile().subscribe((data)=> {
    //   console.log(data);
    //   this.employee= data;
    // });
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
    const newEmployee=this.addEmployeeForm.value;
    //nếu có tồn tại id thì sửa
    if(this.id>0){
      this.serverHttp.editEmployee(this.id,newEmployee).subscribe((data)=>{
        console.log(data);
        this.router.navigate(['']);// sử dụng dịch vụ router để chuyển hướng về trang chủ sau khi chỉnh sửa.
      })

    }else{// nếu id bằng 0 thì thêm vào

      this.serverHttp.postEmployee(newEmployee).subscribe((data)=>{
        console.log(data);
        this.addEmployeeForm.reset();
        this.message="thêm thành công";
      })
      }
    }


  public onSubmit(){
    console.log("hi trang");
  }
}
