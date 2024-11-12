import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Cart, Order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: Cart[] | undefined;
  orderMsg: string | undefined;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity != null && item.price != null) {
          price += +item.price * +item.quantity;
        }
      });

      this.totalPrice = price + price / 10 + 100 - price / 10;
    });
  }

  orderNow(data: { email: string; address: string; contact: string }) {
    let user = typeof window !== 'undefined' && localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: Order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,
      };
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.productService.deleteCartItems(item.id);
        }, 700);
      });
      this.productService.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = 'Seu pedido foi realizado com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMsg = undefined;
          }, 4000);
        }
      });
    }
  }
}
