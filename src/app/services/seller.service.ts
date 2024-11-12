import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, SignUp } from '../data-type';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginerror = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: SignUp) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-auth']);
      });
  }

  reloadSeller() {
    if (typeof window !== 'undefined' && localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: Login) {
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe(
        (result: any) => {
          if (result.body && result.body.length === 1) {
            this.isLoginerror.emit(false);
            localStorage.setItem('seller', JSON.stringify(result.body));
            this.isSellerLoggedIn.next(true);
            this.router.navigate(['seller-home']);
          } else {
            this.isLoginerror.emit(true);
          }
        },
        (error: any) => {
          alert('Erro ao fazer login: ' + error.message);
          this.isLoginerror.emit(true);
        }
      );
  }
}
