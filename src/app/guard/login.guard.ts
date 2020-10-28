import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private route: Router) { }

  canActivate() {

    if (localStorage.getItem('login') !== 'logeado') {

      this.route.navigate(['/']);
      return false;

    }
    return true;
  }
}
