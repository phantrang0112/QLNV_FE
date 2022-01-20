import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ServerhttpService {

  private  REST_API_SERVER= "http://localhost:3000";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
      // Authorization: 'my-auth-token'
    })
  };
  constructor(private httpclient: HttpClient) { }
  public getProfile(): Observable<any> {
    const url= `${this.REST_API_SERVER}/Employee`;
    return this.httpclient.get<any>(url, this.httpOptions).pipe(catchError(this.handleError));// Nhớ import catchError
  }
  public postEmployee(data): Observable<any> {
    const url= `${this.REST_API_SERVER}/Employee`;
    return this.httpclient.post<any>(url, data , this.httpOptions).pipe(catchError(this.handleError));// Nhớ import catchError
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




