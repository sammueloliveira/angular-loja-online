import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent implements OnInit {
  orderData: Order[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getOrderList()
  }

  cancelOrder(orderId: number | undefined) {
    orderId &&
      this.productService.cancelOrder(orderId).subscribe((result) => {
        this.getOrderList()
      });
  }

  getOrderList() {
    this.productService.OrderList().subscribe((result) => {
      this.orderData = result;
    });
  }
}
