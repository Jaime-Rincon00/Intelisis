import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  name = '';
  password = '';

  user = 'admin';
  pass = 'admin';
  msj = false;
  message = false;

  constructor(private router: Router, private authService: AuthService) { }

  ingresar() {
    this.authService.ingresar(this.name, this.password).then(resp => {
      this.router.navigateByUrl('/search');
    }).catch(err => {
      console.log('err', err);
    });
  }

}
