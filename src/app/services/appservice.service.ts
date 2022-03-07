import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
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
  messages;
  title="Home";
  check;
  constructor( private serverHttp: ServerhttpService) { }
  //
  oldTitle="Home";
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
  public setMessage(massege){
    this.messages=massege;
  }
  public getMessage(){
    return this.messages;
  }
  public getTitle(){
    return this.title;
  }
  public setTitel(title){
    // if(this.titel!=titel){
      this.oldTitle= this.title
    
    this.title=title;
    console.log(this.title+"hmmm"+this.oldTitle)
  }
  public getOldTitle(){
    return this.oldTitle;
  }
  public getCheck(){
    return this.check;
  }
  public setCheck(check){
    this.check= check;
  }
}
