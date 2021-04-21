import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoocService {

  constructor(private http: HttpClient) { }

  private _verifyUrl = "http://localhost:5000/api/verify-cert";

  verify_post(obj)
  {
    return this.http.post<any>(this._verifyUrl, obj);
  }

  verify_get()
  {
    return this.http.get<any>(this._verifyUrl);
  }
}
