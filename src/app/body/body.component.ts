import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  employee=[
    {
      name:'Nguyễn văn a',
      address:'quận 9',
      phone:'0291207102',
      img:'/assets/hinh1.jpg'

    },
    {
      name:'Nguyễn văn b',
      address:'quận 9',
      phone:'0291207102',
      img:'/assets/hinh2.jpg',

    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
