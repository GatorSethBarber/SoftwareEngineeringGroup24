import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { map } from 'rxjs';
import { User } from './User';
import { Card } from './card';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    try {
      this.user$.next(JSON.parse(localStorage.getItem('user') ?? 'null'));
    } catch { }
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
        if (r) {
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
      .get<any>(`http://localhost:8080/user/logout`, { headers, withCredentials: true });
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
    userInfo: { username: string } | any
  ): Observable<any> {
    let headers = this.makeRequestHeader();
    return this.http.get<any>(
      `http://localhost:8080/card/get/${userInfo.username}`,
      {
        withCredentials: true,
      }
    );
  }

  // add card
  // router.HandleFunc("/card/new/{username}", newRequestCreateCard).Methods("POST")
  addNewGiftCard(cardInfo: Card): Observable<any> {
    // console.log(this.user$.next(User['use']))
    let headers = this.makeRequestHeader();
    return this.http.post<any>(
      `http://localhost:8080/card/new/${cardInfo.username}`,
      cardInfo,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  // send the request
  //router.HandleFunc("/swaps/request", requestSwap).Methods("POST")
  sendRequest(): Observable<any[]> {
    let headers = this.makeRequestHeader();
    return this.http.post<any>(`http://localhost:8080/swaps/request`, {
      headers
    })
  }




  // get initiated requests
  userRequestsInitiated(): Observable<any> {
    let headers = this.makeRequestHeader();
    return this.http.get<any>(
      `http://localhost:8080/swaps/get/pending/requested/user`,
      {
        withCredentials: true,
      }
    );
  }

  // get recieved requests
  userRequestsRecieved(): Observable<any> {
    let headers = this.makeRequestHeader();
    return this.http.get<any>(
      `http://localhost:8080/swaps/get/pending/requested/others`,
      {
        withCredentials: true,
      }
    );
  }

  // deny swap
  denySwap(): Observable<any> {
    let headers = this.makeRequestHeader();
    return this.http.delete<any>(
      `http://localhost:8080/swaps/deny`,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  // accept swap
  acceptSwap(swapInfo: Card[]): Observable<any> {
    let headers = this.makeRequestHeader();
    return this.http.put<any>(
      `http://localhost:8080/swaps/confirm`,
      swapInfo,
      {
        headers,
        withCredentials: true,
      }
    );
  }
}
