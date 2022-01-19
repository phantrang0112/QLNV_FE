import { Component, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/services/appservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title="danh sách nhân viên";
  numberItem;
  constructor(private appService: AppserviceService) {
    this.numberItem= appService.tongSoNhanVien();
   }

  ngOnInit() {
  }

}
