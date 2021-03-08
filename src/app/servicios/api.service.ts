import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalSettings } from './settings';

var httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = GlobalSettings.API_URL;

  constructor(private http: HttpClient) {}

  getResource(resourceUrl:string) : Observable<any>{
    let urlFormada = this.apiURL + resourceUrl;
    var headers = new HttpHeaders({
      //'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    });
    return this.http.get<any>(urlFormada, httpOptions).pipe(
      map((res) => res)      
    ).pipe(
      catchError((error:any) => throwError(error || 'Server error'))
    );                   
  }

  postResourceToken(resourceUrl:string, data:any, token:string) : Observable<any>{
    var httpOptionsLoc = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return this.http.post(this.apiURL + resourceUrl, data , httpOptionsLoc)
    .pipe(
      map((res) => res)      
    ).pipe(
      catchError((error:any) => throwError(error || 'Server error'))
    );                   
  }
  postResource(resourceUrl:string, data:any) : Observable<any>{
    return this.http.post(this.apiURL + resourceUrl, data , httpOptions)
    .pipe(
      map((res) => res)      
    ).pipe(
      catchError((error:any) => throwError(error || 'Server error'))
    );                   
  }

  postResourceNotBody(resourceUrl:string) : Observable<any>{
    return this.http.post(this.apiURL + resourceUrl, httpOptions)
    .pipe(
      map((res) => res)      
    ).pipe(
      catchError((error:any) => throwError(error || 'Server error'))
    );                   
  }

  postTextResource(resourceUrl:string, data:any) : Observable<any>{
    return this.http.post(this.apiURL + resourceUrl, data , { responseType: 'text' })
    .pipe(
      map((res) => res)      
    ).pipe(
      catchError((error:any) => throwError(error || 'Server error'))
    );               
  }


    
}
