import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
 
  constructor(private http : HttpClient) 
  { }
  register(userInfor:any):Observable<any>{
   const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    return this.http.post<any>('http://localhost:8080/user/new', userInfor, {headers});
  }

  login(userInfor:any):Observable<any>{
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    return this.http.get<any>('http://localhost:8080/user/get', userInfor);
  }

}
