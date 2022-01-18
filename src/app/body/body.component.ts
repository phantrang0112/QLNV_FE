import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  employee=[
    {
      name:'văn a',
      address:'quận 9',
      phone:'0291207102',
      img:'hinh1.jpg'

    },
    {
      name:' văn b',
      address:'quận 9',
      phone:'0291207102',
      img:'hinh2.jpg',

    }
  ]
  public HienThiFullName(){

  }
  constructor() { }

  ngOnInit() {
  }

}
