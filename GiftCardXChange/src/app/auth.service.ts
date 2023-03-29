import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { map } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    try {
      this.user$.next(JSON.parse(localStorage.getItem('user') ?? 'null'));
    } catch {}
  }

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


//register  
  register(
    userInfor: { userName: string; passWord: string } | any
  ): Observable<any> {
    const headers = this.makeRequestHeader();
    return this.http.post<any>('http://localhost:8080/user/new', userInfor, {
      headers,
    });
  }



  
//login
  login(
    userInfor: { userName: string; passWord: string } | any
  ): Observable<any> {
    const headers = this.makeRequestHeader();
    return this.http
      .get<User>(
        `http://localhost:8080/user/get/${userInfor.userName}/${userInfor.passWord}`,
        { headers }
      ).pipe(map(r => {
        if(r){
          localStorage.setItem('currentuser', JSON.stringify(r));
          this.user$.next(r);
      }
      return r
    }));
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

  //get username and profile
  getUserName(userInfor: { userName: string } | any): Observable<any> {
    const headers = this.makeRequestHeader();
    return this.http.get<any>(
      `http://localhost:8080/user/logout`,
      { 
        headers,
        withCredentials: true
      }
    );
  }

  
//user logout
  userlogOut(): Observable<any> {
    const headers = this.makeRequestHeader();
    localStorage.removeItem('user');
    this.user$.next(null);
    return this.http
      .get<any>(`http://localhost:8080/user/logout`, { headers, withCredentials:true });
  }


  brandCards(cardInfo: { companyName: string } | any): Observable<any> {
    const headers = this.makeRequestHeader();
    return this.http.get<any>(`http://localhost:8080/card/get`, {
      params: {
        companyName: cardInfo.CompanyName,
      },
    });
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

  // add card 
  addNewGiftCard(
    userInfo: {companyName: string, userName: string, expirationDate: string,
    amount: number, cardNumber: string } | any
  ): Observable<any> {
    let headers = this.makeRequestHeader();
    return this.http.post<any>(
      `http://localhost:8080/card/new/${userInfo.username}`,
      {
        withCredentials:true,
      }
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
