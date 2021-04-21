import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }

  private _loginUrl = "http://localhost:5000/api/login";
  private _registerUrl = "http://localhost:5000/api/register";

  RegisterUser(user)
  {
    return this.http.post<any>(this._registerUrl,user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }
}
