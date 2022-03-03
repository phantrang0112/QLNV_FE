import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../login/login.component';
@Injectable({
  providedIn: 'root'
})

export class ServerhttpService {

  private REST_API_SERVER = "http://localhost:3000";// server của json
  private REST_API_SERVER1 = "http://localhost:8080";
  token = localStorage.getItem('token');
  private httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      // "Content-Type": "multipart/form-data",
    }),
  };

  constructor(private httpclient: HttpClient) { }
  public getEmployeePage(page: number, page_size: number, token: string) {
    this.token = token;
    let string=  'Bearer ' + this.token;
     let httpOptionss = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
        // "Access-Control-Allow-Origin":"*"
      }),
     
    };
    if (this.token != null) {
      console.log(this.token);
       this.httpOptions.headers.set('Authorization', string);
     console.log(this.httpOptions.headers.get('Authorization'))
      const url = `${this.REST_API_SERVER1}/Employee/getPage` + `?page=` + page + `&page-size=` + page_size;
      return this.httpclient.get<any>(url, httpOptionss).pipe(catchError(this.handleError));
    }
  }
  // lấy toàn bộ  nhân viên
  public getProfile(token): Observable<any> {
    this.token = token;
    const url = `${this.REST_API_SERVER1}/Employee`;
    return this.httpclient.get<any>(url, this.httpOptions).pipe(catchError(this.handleError));// Nhớ import catchError
  }
  // lấy 1 nhân viên thông qua id
  public getEmployeeId(employeeId: number) {
    const url = `${this.REST_API_SERVER1}/Employee/` + employeeId;
    return this.httpclient.get<any>(url, this.httpOptions).pipe(catchError(this.handleError));// Nhớ import catchError
  }
  // thêm 1 nhân viên
  public postEmployee(data: Employee): Observable<any> {
    const url = `${this.REST_API_SERVER1}/Employee`;
    return this.httpclient.post<any>(url, data, this.httpOptions).pipe(catchError(this.handleError));// Nhớ import catchError
  }
  // Chinh sửa 1 nhân viên
  public editEmployee(employeeId: number, data): Observable<any> {// truyền vào id và giá trị của data
    const url = `${this.REST_API_SERVER1}/Employee/edit/` + employeeId; // thêm id đằng sau để trỏ tới đối tượng có id đó
    return this.httpclient.put<any>(url, data, this.httpOptions).pipe(catchError(this.handleError));// Nhớ import catchError
  }
  // Xóa 1 nhân viên thông qua id
  public deleteEmployee(employeeId: number) {
    const url = `${this.REST_API_SERVER1}/Employee/` + employeeId;
    return this.httpclient.delete<any>(url,this.httpOptions).pipe(catchError(this.handleError));// Nhớ import catchError
  }

  public login(data): Observable<any> {
    const url = `${this.REST_API_SERVER1}/Employee/authenticatite`;
    return this.httpclient.post<any>(url, data, this.httpOptions).pipe(catchError(this.handleError))
  }
  public generateToken(data) {
    const url = `${this.REST_API_SERVER1}/Employee/authenticate`;
    return this.httpclient.post<any>(url, data).pipe(catchError(this.handleError))
  }
  public getEmployeesSearch(name: string, page: number, page_size: number): Observable<any> {
    const url = `${this.REST_API_SERVER1}/Employee/search/` + name + "/" + `?page=` + page + `&page-size=` + page_size;
    return this.httpclient.get<any>(url, this.httpOptions).pipe(catchError(this.handleError));
  }
  public register(data){
    const url = `${this.REST_API_SERVER1}/Employee/register`;
    return this.httpclient.post<any>(url, data).pipe(catchError(this.handleError))
  }
  public changePass(data){
    const url = `${this.REST_API_SERVER1}/Employee/changepass`;
    return this.httpclient.put<any>(url, data,this.httpOptions).pipe(catchError(this.handleError))
  }
  public uploadImg(data,id:number){
    // this.httpOptions.headers.append( 'Content-Type',"multipart/form-data");
    const formData = new FormData();
    formData.append('file',data);
    console.log(this.httpOptions.headers.get('Authorization'));    
    console.log(data);
    // this.httpOptions.headers.set("Content-Type", "multipart/form-data");
    const url = `${this.REST_API_SERVER1}/Employee/upload/`+id;
    return this.httpclient.post<any>(url,formData,{headers:this.httpOptions.headers,reportProgress: true,
      responseType: 'json'}).pipe(catchError(this.handleError))
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}




