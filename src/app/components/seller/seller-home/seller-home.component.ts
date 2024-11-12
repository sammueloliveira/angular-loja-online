import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../data-type';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | Product[];
  productMessage: undefined | string;

  icon =  faTrash;
  editIcon = faEdit;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
   this.list()
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Produto deletado com sucesso!';
        this.list()
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list(){
    this.product.getProduct().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }
}
