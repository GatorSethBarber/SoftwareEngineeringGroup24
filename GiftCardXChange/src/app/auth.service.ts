import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

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

  setCookie(
    userInfor: { userName: string; passWord: string } | any
  ): Observable<any> {
    const headers = this.makeRequestHeader();
    return this.http.get<any>(
      `http://localhost:8080/user/login/${userInfor.userName}/${userInfor.passWord}`,
      {
        headers: headers,
        withCredentials: true
      }
    )
  }

  userlogOut(): Observable<any> {
    const headers = this.makeRequestHeader();
    return this.http.get<any>(
      `http://localhost:8080/user/logout`,
      { 
        headers,
        withCredentials: true
      }
    );
  }



  brandCards(
    cardInfo: { companyName: string} | any
  ): Observable<any> {
    const headers = this.makeRequestHeader();
    return this.http.get<any>(
      `http://localhost:8080/card/get`,
      { params: {
        companyName: cardInfo.CompanyName,
      },}
    );
  }

  // https://github.com/angular/angular/issues/31373
  userCards(
    userInfo: { username: string} | any
  ): Observable<any> {
    let headers = this.makeRequestHeader();
    return this.http.get<any>(
      `http://localhost:8080/card/get/${userInfo.username}`,
      {
        withCredentials:true,
      }
    );
  }
  

}
