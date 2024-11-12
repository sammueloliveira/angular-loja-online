import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService} from '../../../services/product.service';
import { Product } from '../../../data-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    
  }

  submit(data: Product){
   this.product.addProduct(data).subscribe((result) => {
      if(result) {
        this.addProductMessage = "Produto cadastrado com sucesso!"
      }
      setTimeout(() => (this.addProductMessage = undefined),3000)
   })
  }
}
