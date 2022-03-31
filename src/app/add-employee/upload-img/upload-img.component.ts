import { Component, Directive, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';


import { ServerhttpService } from 'src/app/services/serverhttp.service';
import Swal from 'sweetalert2';

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
  fileName;
  // uploadImgForm = new FormGroup({
  //   fileImg: new FormControl("")
  // })
  constructor(private service: ServerhttpService,private router: Router,private route:ActivatedRoute,private notify: NotifyService) { }

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
      this.fileName=this.selectfile.name;

    }

  }
  uploadImg(){
    Swal.fire({
      title: 'Want to update your image?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      iconHtml: '<i class="fa fa-exclamation-circle" style="color: rgb(175, 175,29);width: 30px;boder:none"></i>',
      customClass: {
        icon: 'class-none'
      },
    }).then((result) => {
      if(result.isConfirmed && this.selectfile){
        this.service.uploadImg(this.selectfile,this.id).subscribe((data)=>{
          this.employee=data;
          this.notify.notifySuccessToggerMessage('Update image success')
          this.router.navigate(['employee-form', this.employee.id]);
        })

      }
      else{
        this.notify.notifiError('Error','Update image failed')
      }
    })
    // console.log(this.uploadImgForm.get('fileImg').value);
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
