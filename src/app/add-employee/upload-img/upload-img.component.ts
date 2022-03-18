import { Component, Directive, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { ServerhttpService } from 'src/app/services/serverhttp.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.css']
})
@Directive({
  selector: "input[type=file]",
  host : {
      "(change)" : "onChange($event.target.files)",
      "(blur)": "onTouched()"
  },
  providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: UploadImgComponent, multi: true }
  ]
})
export class UploadImgComponent implements OnInit {
  url = "https://elead.com.vn/wp-content/uploads/2020/04/anh-dep-hoa-huong-duong-va-mat-troi_022805970-1-1181x800-6.jpg";
  selectfile:File;
  employee: Employee;
  id;
  img="avt.jpg";
  // uploadImgForm = new FormGroup({
  //   fileImg: new FormControl("")
  // })
  constructor(private service: ServerhttpService,private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.url= this.img;
    this.id=+this.route.snapshot.paramMap.get('id');
  }
  changeImg(event) {
    this.selectfile = (event.target as HTMLInputElement).files[0];
    if (this.selectfile) {
      // var render = new FileReader();
      // render.readAsDataURL(this.selectfile)
      // render.onload = (event: any) => {
      // }
      this.url = this.selectfile.name;

    }

  }
  uploadImg(){
    let choice = confirm("Bạn muốn cập nhật ảnh ?");
    // console.log(this.uploadImgForm.get('fileImg').value);
    if (choice&& this.selectfile) {
      this.service.uploadImg(this.selectfile,this.id).subscribe((data)=>{
        this.employee=data;
        this.router.navigate(['employee-form', this.employee.id]);
      })
    }
    else{

    }
  }
}
export interface Employee {
  id:number;
  name: string;
  phone: string;
  addess: string;
  age: string;
  img: string;
  pass: string;
  username: string;
}
