import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkConfigService {

  constructor() { }
  private REST_API_SERVER = "http://localhost:3000";
  private REST_API_SERVER1 = "http://localhost:8083";
  private key="Q71Pe7593PMeK0EpVAqh1rdSVphi1zpWmLLJDtAUaBSefDa9Wo";
  private REST_API_verify_email="https://app.verify-email.org/api/v1/"+this.key+"/verify/";
  public getRestAPISpringBoot(){
    return this.REST_API_SERVER1;
  }
  getRestAPIJson(){
    return this.REST_API_SERVER;
  }
  public getRestAPIVerifyEmail(){
    return this.REST_API_verify_email;
  }
}
