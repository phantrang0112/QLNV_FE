import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';
import { Employee } from 'src/app/body/body.component';

import { ServerhttpService } from 'src/app/services/serverhttp.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.css']
})
export class UploadImgComponent implements OnInit {
  url = "https://elead.com.vn/wp-content/uploads/2020/04/anh-dep-hoa-huong-duong-va-mat-troi_022805970-1-1181x800-6.jpg";
  selectfile= null;
  employee: Employee;
  id;
  constructor(private service: ServerhttpService,private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.id=+this.route.snapshot.paramMap.get('id');
  }
  changeImg(event) {
    console.log(event);
    this.selectfile = event.target.files[0];
    console.log(event);
    console.log(this.selectfile);

    if (this.selectfile) {
      var render = new FileReader();
      render.readAsDataURL(this.selectfile)
      render.onload = (event: any) => {
      }
      this.url = this.selectfile.name;
    }

  }
  uploadImg(){
    let choice = confirm("Bạn muốn cập nhật ảnh ?");
    console.log(choice);
    if (choice&& this.selectfile) {
      console.log(choice);
      this.service.uploadImg(this.selectfile,this.id).subscribe((data)=>{
        this.employee=data;
        this.router.navigate(['employeeForm', this.employee.id]);
      })
    }
    else{
      
    }
  }
}
