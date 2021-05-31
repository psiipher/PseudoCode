import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder } from '@angular/forms';
import { SigninService } from '../signin.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 

  constructor(private fb:FormBuilder, private SigninService:SigninService, private router: Router, 
      private toastr: ToastrService) { }

  get password()
  {
    return this.login.get('password');
  }

  get mail_id()
  {
    return this.login.get('mail_id');
  }

  login = this.fb.group({

    mail_id:[''],
    password:['']    
  });

  onSubmit(){
    this.SigninService.loginUser(this.login.value).subscribe(res => { 
      localStorage.setItem('username', this.login.value.mail_id), 
      this.router.navigate(['/dashboard']),
      this.toastr.success('Welcome to PseudoCode');
    },

    err => {
      console.log(err),
      this.toastr.error('Invalid Credintials');
    });
  }
}
