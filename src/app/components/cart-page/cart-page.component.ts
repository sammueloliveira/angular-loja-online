import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Cart, PriceSomary } from '../../data-type';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cartData: Cart[] | undefined;
  priceSummary: PriceSomary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }

  removeToCart(cartId: number | undefined) {
    cartId &&
      this.cartData &&
      this.productService.removeToCart(cartId).subscribe((result) => {
        this.loadDetails();
      });
  }

  loadDetails() {
    this.productService.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity != null && item.price != null) {
          price += +item.price * +item.quantity;
        }
      });

      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + price / 10 + 100 - price / 10;
      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }
    });
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
