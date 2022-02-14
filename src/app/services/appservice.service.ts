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
  loginMode=!localStorage.getItem('username');
  public numberItem=0;
  constructor( private serverHttp: ServerhttpService) { }
  //
  token=null;
  public getToken(){
    return this.token;
  }
  public setToken(token:string){
    this.token=token;
  }
  public btnLogin(){
    console.log(this.loginMode);
    return this.loginMode;
  }
  onSwitch(){
    this.loginMode=!this.loginMode;
  }
}
