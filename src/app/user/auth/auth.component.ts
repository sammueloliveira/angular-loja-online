import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Cart, Login, Product, SignUp } from '../../data-type';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';

  constructor(private user: UserService, private product: ProductService) {}

  ngOnInit(): void {
    this.user.userAuthReoad();
  }

  signUp(data: SignUp) {
    this.user.userSignUp(data);
  }

  login(data: Login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = 'Usuario não encontrado!';
      } else {
        this.localCartToRemove();
      }
    });
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }

  localCartToRemove() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    let data = localStorage.getItem('localCart');
    if (data) {
      let cartDataList: Product[] = JSON.parse(data);

      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId,
        };

        delete cartData.id;

        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn('Dados salvos no banco de dados!');
            }
          });
        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }

    setTimeout(()=> {
    this.product.getCartList(userId)
    }, 2000)
  }
}
