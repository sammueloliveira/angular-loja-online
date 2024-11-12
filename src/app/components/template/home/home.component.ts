import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../data-type';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbModule, NgbCarouselModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: undefined | Product[]
  trendyProducts: undefined | Product[]

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.popularProducts().subscribe((data)=> {
      this.products = data
    })
    this.productService.trendyProducts().subscribe((data)=> {
      this.trendyProducts = data
    })
  }


}
