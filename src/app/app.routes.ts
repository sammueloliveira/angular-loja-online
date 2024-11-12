import { Routes } from '@angular/router';
import { HomeComponent } from './components/template/home/home.component';
import { SellerAuthComponent } from './components/seller/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './components/seller/seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './components/seller/seller-add-product/seller-add-product.component';
import { SellerUpdateComponent } from './components/seller/seller-update/seller-update.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { AuthComponent } from './user/auth/auth.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'seller-auth',
        component:SellerAuthComponent
       
    },
     {
        path:'seller-auth',
        component:SellerAuthComponent
       
    },
    {
        path:'seller-home',
        component:SellerHomeComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'seller-add-product',
        component:SellerAddProductComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'seller-update/:id',
        component:SellerUpdateComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'search/:query',
        component:SearchComponent,
        
    },
    {
        path:'product-details/:id',
        component:ProductDetailsComponent,
        
    },
    {
        path:'user-auth',
        component:AuthComponent,
        
    },
    {
        path:'cart-page',
        component:CartPageComponent,
        
    },
    {
        path:'checkout',
        component:CheckoutComponent,
        
    },
    {
        path:'my-orders',
        component:MyOrdersComponent,
        
    },
];
