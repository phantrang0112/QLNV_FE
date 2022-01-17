import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title="danh sách nhân viên";
  numberItem= 3;
  constructor() { }

  ngOnInit() {
  }

}
