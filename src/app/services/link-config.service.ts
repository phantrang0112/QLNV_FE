import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkConfigService {

  constructor() { }
  private REST_API_SERVER = "http://localhost:3000";
  private REST_API_SERVER1 = "http://localhost:8083";
  public getRestAPISpringBoot(){
    return this.REST_API_SERVER1;
  }
  getRestAPIJson(){
    return this.REST_API_SERVER;
  }
}
