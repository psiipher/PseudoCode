import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private http: HttpClient) { }

  private _cfUrl = "http://localhost:5000/api/code/codeforces";

  cf_get()
  {
    return this.http.get<any>(this._cfUrl);
  }
}
