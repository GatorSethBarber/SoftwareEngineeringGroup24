import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {}

  getToken() {
    // Todo replace with logic to get token
    return '';
  }

  makeRequestHeader(authorize: boolean = false) {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Method', 'GET, POST')
      .set('Access-Control-Allow-Origin', '*');

    if (authorize) {
      header.set('Authorization', `bearer ${this.getToken()}`);
    }
    return header;
  }

  register(
    userInfor: { userName: string; passWord: string } | any
  ): Observable<any> {
    const headers = this.makeRequestHeader();
    return this.http.post<any>('http://localhost:8080/user/new', userInfor, {
      headers,
    });
  }

  login(
    userInfor: { userName: string; passWord: string } | any
  ): Observable<any> {
    const headers = this.makeRequestHeader();
    return this.http.get<any>(
      `http://localhost:8080/user/get/${userInfor.userName}/${userInfor.passWord}`,
      { headers }
    );
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
