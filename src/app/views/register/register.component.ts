import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, Validators } from '@angular/forms';
import {ValidationService} from './validation.service';
import { SigninService } from '../signin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  constructor(private fb:FormBuilder, 
              private SigninService:SigninService, 
              private router: Router,
              private toastr: ToastrService) { }

  get first_name()
  {
    return this.registration.get('first_name');
  }

  get mail_id()
  {
    return this.registration.get('mail_id');
  }

  get last_name()
  {
    return this.registration.get('last_name');
  }

  get phone()
  {
    return this.registration.get('phone');
  }

  get password()
  {
    return this.registration.get('password');
  }

  registration = this.fb.group({

    first_name:['', [Validators.required]],
    last_name:['', [Validators.required]],
    mail_id:['', [ValidationService.emailValidator,Validators.required]],
    password:['', [Validators.minLength(5)]],
    phone:['', [ValidationService.mobileValidator,Validators.required]]
    
  });

  onSubmit(){
    console.log((this.registration.value));
    this.SigninService.RegisterUser(this.registration.value).subscribe(res => {
      localStorage.setItem('username', this.registration.value.mail_id),
      this.router.navigate(['/dashboard']),
      this.toastr.success('Welcome to PseudoCode');
      this.toastr.info("You can add more information by clicking on Edit Info button!");
    },
    err => {
      console.log(err),
      this.toastr.error('Account with same credentials already exists!');
    })
  }



  //   this.show_card = true;
  //   window.scrollTo(0,0);

  //   this.startTimer();

  //   setTimeout(() => {
  //     this.router.navigate(['/login']);
  // }, 5000);  //3.5s

  
   

//   }
//   timeLeft: number = 4;
//   interval;


//   startTimer() {
//     this.interval = setInterval(() => {
//       if(this.timeLeft > 0) {
//         this.timeLeft--;
//       } else {
//         this.timeLeft = 4;
//       }
//     },1000)
//   }



}
