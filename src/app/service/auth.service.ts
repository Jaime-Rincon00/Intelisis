import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = 'admin';
  pass = 'admin';

  constructor() { }

  ingresar(name: string, password: string): Promise<any> {
    if (this.user === name && this.pass === password) {
      return;
    }
  }
}
