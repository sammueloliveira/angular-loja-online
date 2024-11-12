import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../../data-type';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-seller-update',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './seller-update.component.html',
  styleUrl: './seller-update.component.css',
})
export class SellerUpdateComponent implements OnInit {
  productData: undefined | Product;
  editProductMessage: string | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.productService.getProductId(productId).subscribe((data) => {
        this.productData = data;
      });
  }

  edit(data: Product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((result) => {
      if (result) {
        this.editProductMessage = 'Produto atualizado com sucesso!';
      }
    });
    setTimeout(() => {
      this.editProductMessage = undefined;
    }, 3000);
  }
}
