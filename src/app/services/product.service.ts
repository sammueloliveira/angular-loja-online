import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Order, Product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<Product[] | []>();

  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  addProduct(data: Product) {
    return this.http.post(`http://localhost:3000/products`, data);
  }

  deleteProduct(id: number) {
    return this.http.delete<Product[]>(`http://localhost:3000/products/${id}`);
  }

  getProductId(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }

  popularProducts() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=5`);
  }

  trendyProducts() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=8`);
  }

  searchProducts(query: string) {
    return this.http.get<Product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  addToCart(cartData: Cart) {
    return this.http.post(`http://localhost:3000/cart`, cartData);
  }

  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');

    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);

      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }

    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  getCartList(userId: number) {
    return this.http
      .get<Product[]>(`http://localhost:3000/cart?userId=` + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  removeToCart(cartId: number) {
    return this.http.delete(`http://localhost:3000/cart/` + cartId);
  }

  currentCart() {
    let userStore =
      typeof window !== 'undefined' && localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>(
      `http://localhost:3000/cart?userId=` + userData.id
    );
  }

  orderNow(data: Order) {
    return this.http.post(`http://localhost:3000/order`, data);
  }

  OrderList() {
    let userStore =
      typeof window !== 'undefined' && localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>(
      `http://localhost:3000/order?userId=` + userData.id
    );
  }

  deleteCartItems(cartId: number) {
    return this.http
      .delete(`http://localhost:3000/cart/` + cartId, {observe: 'response'})
      .subscribe((result) => {
        if (result) {
          this.cartData.emit([]);
        }
      });
  }

  cancelOrder(orderId: number) {
    return this.http.delete(`http://localhost:3000/order/` + orderId);
  }

  
}
