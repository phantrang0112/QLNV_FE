import { Component, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/services/appservice.service';
import { ServerhttpService } from 'src/app/services/serverhttp.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title="danh sách nhân viên";
  numberItem;
  employee;
  constructor(private appService: AppserviceService, private serverHttp: ServerhttpService) {


   }

  ngOnInit() {
    // this.numberItem= this.appService.tongSoNhanVien();
    console.log(this.numberItem+"ngonnit");
    this.serverHttp.getProfile().subscribe((data)=> {
      console.log(data);
      console.log("hitrang0");
      this.employee= data;
      this.numberItem= this.employee.length;
      console.log(this.numberItem)
    });
  }

}
