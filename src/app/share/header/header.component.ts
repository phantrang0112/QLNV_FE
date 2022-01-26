import { Component, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/services/appservice.service';
import { ServerhttpService } from 'src/app/services/serverhttp.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title="Danh sách nhân viên";

  employee;
  constructor(private appService: AppserviceService, private serverHttp: ServerhttpService) {


   }

  ngOnInit() {
    // this.numberItem= this.appService.tongSoNhanVien();

  }

}
