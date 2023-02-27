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
    return this.http.post<any>('http://localhost:8080/user/new', userInfor);
  }

  login(userInfor:any):Observable<any>{
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    return this.http.get('http://localhost:8080/user/get', userInfor);
  }
//    register(username:any, email:any ,password:any,firstname:any,lastname:any){
//   let headers = new HttpHeaders().set('content-type', 'application/json')
//     .set('Access-Control-Allow-Origin', '*');
  
//   const body = JSON.stringify({
//     username: username,
//     email: email,
//     password: password,
//     firstname: firstname,
//     lastname: lastname
//   });
//   return this.http.post('http://localhost:8080/user/new',body,{headers: headers});
//  }


//  login(username:any, password:any){
//   let headers = new HttpHeaders().set('content-type', 'application/json')
//     .set('Access-Control-Allow-Origin', '*');
  
//   const body = JSON.stringify({
//     username: username,
//     password: password
//   });
//   return this.http.get('http://localhost:8080/user/get', {headers});
//  }
}



