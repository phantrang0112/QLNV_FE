import { Injectable } from '@angular/core';
import { ServerhttpService } from './serverhttp.service';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

    employee='';
  //  [
  //   {
  //     name:'văn a',
  //     address:'quận 9',
  //     phone:'0291207102',
  //     img:'hinh1.jpg',
  //     age: null,

  //   },
  //   {
  //     name:' văn b',
  //     address:'quận 9',
  //     phone:'0291207102',
  //     img:'hinh2.jpg',

  //   },
  //   {
  //     name:' Thị C',
  //     address:'quận 9',
  //     phone:'0291207102',
  //     img:'hinh2.jpg',

  //   }
  // ]
  public numberItem=0;
  constructor( private serverHttp: ServerhttpService) { }
  public datas;
  public tongSoNhanVien(): number{
   this.datas= this.serverHttp.getProfile().subscribe((data)=> {
      console.log(data);
      console.log("hitrang0");
      this.employee= data;
      this.numberItem= this.employee.length;
      console.log(this.numberItem+"http");
      return this.numberItem;
    });
    console.log("hitrang1"+this.numberItem+ this.datas);
    return this.numberItem;
  }
  public abc(){
    return 6;
  }
}
