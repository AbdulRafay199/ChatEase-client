import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)
  domain:string = `https://localhost:7005/api/User`
  
  login(body: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({'Content-Type':'application/json;'});
    
    return this.http.post<any>(`${this.domain}/login`, body, { headers, observe: 'response' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError({ status: error.status, message: error.error }); // Forward the error to the caller
        })
      );
  }

  GetUserDetails(token: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.domain}/getbytoken`, {headers, observe: 'response' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError({ status: error.status, message: error.error }); // Forward the error to the caller
        })
      );
  }

  GetAllUsers(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.domain}`, {observe: 'response' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError({ status: error.status, message: error.error }); // Forward the error to the caller
        })
      );
  }

  GetUserById(id: any): Observable<any> {
    return this.http.post<any>(`${this.domain}/getbyid`,id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError({ status: error.status, message: error.error }); // Forward the error to the caller
        })
      );
  }

}
