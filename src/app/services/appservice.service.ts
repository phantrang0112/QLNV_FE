import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

   employee=[
    {
      name:'văn a',
      address:'quận 9',
      phone:'0291207102',
      img:'hinh1.jpg',
      age: null,

    },
    {
      name:' văn b',
      address:'quận 9',
      phone:'0291207102',
      img:'hinh2.jpg',

    },
    {
      name:' Thị C',
      address:'quận 9',
      phone:'0291207102',
      img:'hinh2.jpg',

    }
  ]
  public numberItem;
  constructor() { }
  public tongSoNhanVien(){
    this.numberItem= this.employee.length;
    return this.numberItem;
  }
}
