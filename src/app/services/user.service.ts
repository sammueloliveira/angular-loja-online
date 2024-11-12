import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(user: SignUp) {
    this.http
      .post('http://localhost:3000/users', user, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }

  userLogin(data: Login) {
    this.http
      .get<SignUp[]>(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if (result && result.body?.length) {
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        } else {
          this.invalidUserAuth.emit(true);
        }
      });
  }

  userAuthReoad() {
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
