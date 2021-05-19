import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }

  private _loginUrl = "http://localhost:5000/api/login";
  private _registerUrl = "http://localhost:5000/api/register";
  private _todoUrl = "http://localhost:5000/api/todo";
  private _newsUrl = "http://localhost:5000/api/news"
  private _editInfoUrl = "http://localhost:5000/api/editinfo";
  RegisterUser(user)
  {
    return this.http.post<any>(this._registerUrl,user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  todo_get(username) {
    let _get_todoUrl = this._todoUrl + '/' + username;
    return this.http.get<any>(_get_todoUrl);
  }

  todo_post(todo_obj) {
    return this.http.post<any>(this._todoUrl, todo_obj);
  }

  news_get() {
    return this.http.get<any>(this._newsUrl);
  }

  editInfo_get(username) {
    let _get__editInfoUrl = this._editInfoUrl + '/' + username;
    return this.http.get<any>(_get__editInfoUrl);
  }

  editInfo_post(editInfo_obj) {
    return this.http.post<any>(this._editInfoUrl, editInfo_obj);
  }
}
