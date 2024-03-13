import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  http = inject(HttpClient)
  domain:string = `https://localhost:7005/api/Chat`


  GetConversations(token: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.domain}/getconvobytoken`, {headers, observe: 'response' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError({ status: error.status, message: error.error }); // Forward the error to the caller
        })
      );
  }

  GetAllMsg(id1: number,id2:number): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.domain}/getspecificmsgs/${id1}/${id2}`, {observe: 'response' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError({ status: error.status, message: error.error }); // Forward the error to the caller
        })
      );
  }

  SendMsg(body:object): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.domain}`,body, {observe: 'response' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError({ status: error.status, message: error.error }); // Forward the error to the caller
        })
      );
  }


}
