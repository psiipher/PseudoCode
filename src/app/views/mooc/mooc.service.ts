import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Courses } from './courses';
@Injectable({
  providedIn: 'root'
})
export class MoocService {

  constructor(private http: HttpClient) { }

  private _verifyUrl = "http://localhost:5000/api/verify-cert";

  getUdemy() {
    return this.http.get<any>('assets/udemy.json')
        .toPromise()
        .then(res => <Courses[]>res.data)
        .then(data => { return data; });
  }
  getCoursera() {
    return this.http.get<any>('assets/coursera.json')
        .toPromise()
        .then(res => <Courses[]>res.data)
        .then(data => { return data; });
  }
  getUdacity() {
    return this.http.get<any>('assets/udacity.json')
        .toPromise()
        .then(res => <Courses[]>res.data)
        .then(data => { return data; });
  }
  verify_post(obj)
  {
    return this.http.post<any>(this._verifyUrl, obj);
  }

  verify_get()
  {
    return this.http.get<any>(this._verifyUrl);
  }
}
