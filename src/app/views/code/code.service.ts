import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private http: HttpClient) { }

  private _cfUrl = "http://localhost:5000/api/codeforces/user_profile";
  private _problemUrl = "http://localhost:5000/api/codeforces/problems";

  cf_get()
  {
    return this.http.get<any>(this._cfUrl);
  }

  handleName_post(obj) {
    return this.http.post<any>(this._cfUrl, obj);
  }

  problems_get() {
    return this.http.get<any>(this._problemUrl);
  }

  problems_post(tag) {
    return this.http.post<any>(this._problemUrl, tag);
  }
}
