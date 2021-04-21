import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MoocService } from '../mooc.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-cert',
  templateUrl: './verify-cert.component.html',
  styleUrls: ['./verify-cert.component.scss']
})
export class VerifyCertComponent implements OnInit {
  sites: any;
  type: any;
  courseName: any;
  recipientName: any;
  completionDate: any;
  isVerified: boolean = true;
  sidebar = false;
  position: string;
  courseUrl: any;
  courseId: any;
  instructorName: any;

  constructor(private _service: MoocService, private fb:FormBuilder, private toastr: ToastrService) { 
    this.sites = [
      {name: 'Coursera', code: 'coursera'},
      {name: 'Udemy', code: 'udemy'},
      {name: 'EDX', code: 'edx'},
  ];
  }

  ngOnInit(): void {
  }

  get platform()
  {
    return this.verify_cert.get('platform');
  }

  get id()
  {
    return this.verify_cert.get('id');
  }

  onSubmit() {
    this._service.verify_post(this.verify_cert.value).subscribe(
      res => {
        console.log(this.verify_cert.value);
        this.verify_get();
      },
      err => {
        console.log(err);
        this.toastr.error('Please retry!');
      }
    );
  }

  verify_get() {
    this._service.verify_get().subscribe(
      res => {
        this.define_value(res);
    },
    err => {
      console.log(err);
    });
  }

  define_value(res) {
      if (res.isVerified === undefined || res.isVerified === true) {
        this.type = res.type;
        this.completionDate = res.completionDate.slice(0,10);
        this.courseName = res.courseName;
        this.recipientName = res.recipientName;
        this.sidebar = true;
        this.position = 'right';

        if (res.type === "Udemy") {
          this.courseId = res.courseId;
          this.courseUrl = res.courseUrl;
          this.instructorName = res.instructorName;
        }
        console.log(this.courseUrl);
      }
      
    else{
      this.isVerified = false;
      this.toastr.error('Please enter valid details!');
    }    
  }

  open_url() {
    window.open(this.courseUrl);
  }

  verify_cert = this.fb.group({
    platform:[''],
    id:['']    
  });
  
}
