import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../data-type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | Product[];
  userName: string = '';
  cartItems = 0;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (
          typeof window !== 'undefined' &&
          localStorage.getItem('seller') &&
          val.url.includes('seller')
        ) {
          this.menuType = 'seller';

          const sellerStore = localStorage.getItem('seller');
          if (sellerStore) {
            try {
              const sellerData = JSON.parse(sellerStore)[0];
              this.sellerName = sellerData.name;
              this.menuType = 'seller';
            } catch (e) {
              console.error('Erro ao parsear os dados do vendedor:', e);

              localStorage.removeItem('seller');
            }
          }
        } else if (
          typeof window !== 'undefined' &&
          localStorage.getItem('user')
        ) {
          const userStore = localStorage.getItem('user');
          if (userStore) {
            try {
              const userData = JSON.parse(userStore);
              this.userName = userData.name;
              this.menuType = 'user';
              this.productService.getCartList(userData.id)
            } catch (e) {
              console.error('Erro ao parsear os dados do usuário:', e);

              localStorage.removeItem('user');
            }
          }
        } else {
          this.menuType = 'default';
        }
      }
    });

    let cartData =
      typeof window !== 'undefined' && localStorage.getItem('localCart');

    if (cartData) {
      console.log(cartData);
      this.cartItems = JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
    
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.productService.cartData.emit([])
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.productService.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    this.router.navigate([`search/${val}`]);
  }

  redirectToDetails(id: number) {
    this.router.navigate(['/product-details/' + id]);
  }
}
