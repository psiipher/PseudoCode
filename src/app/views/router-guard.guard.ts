import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SigninService } from './signin.service';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardGuard implements CanActivate {

  constructor(private _formService: SigninService,
    private _router: Router) { }

    canActivate(): boolean {
      if (this._formService.loggedIn()) {
        console.log('true')
        return true
      } else {
        console.log('false')            
        this._router.navigate(['/login'])
        return false
      }
    }
  
}
