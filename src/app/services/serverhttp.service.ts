import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ServerhttpService {

  private  REST_API_SERVER= "http://localhost:3000";// server của json
  private  REST_API_SERVER1= "http://localhost:8080";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',

      // Authorization: 'my-auth-token'
      // "Access-Control-Allow-Origin":"*"
    })

  };

  constructor(private httpclient: HttpClient) { }
  // lấy toàn bộ  nhân viên
  public getProfile(): Observable<any> {
    const url= `${this.REST_API_SERVER1}/Employee`;
    return this.httpclient.get<any>(url, this.httpOptions).pipe(catchError(this.handleError));// Nhớ import catchError
  }
  // lấy 1 nhân viên thông qua id
  public getEmployeeId(employeeId: number){
    const url= `${this.REST_API_SERVER1}/Employee/`+employeeId;
    return this.httpclient.get<any>(url, this.httpOptions).pipe(catchError(this.handleError));// Nhớ import catchError
  }
  // thêm 1 nhân viên
  public postEmployee(data): Observable<any> {
    const url= `${this.REST_API_SERVER1}/Employee`;
    return this.httpclient.post<any>(url, data , this.httpOptions).pipe(catchError(this.handleError));// Nhớ import catchError
  }
  // Chinh sửa 1 nhân viên
  public editEmployee(employeeId: number, data): Observable<any> {// truyền vào id và giá trị của data
    const url= `${this.REST_API_SERVER1}/Employee/`+employeeId; // thêm id đằng sau để trỏ tới đối tượng có id đó
    return this.httpclient.put<any>(url, data , this.httpOptions).pipe(catchError(this.handleError));// Nhớ import catchError
  }
  // Xóa 1 nhân viên thông qua id
  public deleteEmployee(employeeId: number) {
    const url= `${this.REST_API_SERVER1}/Employee/`+employeeId;
    return this.httpclient.delete<any>(url).pipe(catchError(this.handleError));// Nhớ import catchError
  }
  public getEmployeePage(page: number, page_size: number){
    const url= `${this.REST_API_SERVER1}/Employee/getPage`+`?page=`+page+`&page-size=`+ page_size;
    return this.httpclient.get<any>(url).pipe(catchError(this.handleError));
  }
  public login(data):Observable<any>{
    const url= `${this.REST_API_SERVER1}/Employee/login`;
    return this.httpclient.post<any>(url,data,this.httpOptions).pipe(catchError(this.handleError))
  }
  public getEmployeesSearch(name: string,page: number, page_size: number):Observable<any>{
    const url= `${this.REST_API_SERVER1}/Employee/search/`+name+"/"+`?page=`+page+`&page-size=`+ page_size;
    return this.httpclient.get<any>(url,this.httpOptions).pipe(catchError(this.handleError));
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




