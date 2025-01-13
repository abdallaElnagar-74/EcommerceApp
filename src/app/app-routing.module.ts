import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailsComponent } from './details/details.component';
import { PaymentComponent } from './payment/payment.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SettingComponent } from './setting/setting.component';
import { CategoryproductsComponent } from './category-products/categoryproducts/categoryproducts.component';
import { BrandsproductsComponent } from './category-products/brandsproducts/brandsproducts.component';

const routes: Routes = [
  {path:"",canActivate:[authGuard],component:BlankLayoutComponent,children:[
    {path:"",redirectTo:'home',pathMatch:"full"},
    {path:'home',component:HomeComponent ,title:'home'},
    {path:'cart',component:CartComponent,title:"cart"},
    {path:'wishlist',component:WishlistComponent,title:"wishlist"},
    {path:'products',component:ProductsComponent,title:"products"},
    {path:'details/:id',component:DetailsComponent,title:"details"},
    {path:'categories',component:CategoriesComponent,title:"categories"},
    {path:'payment/:id',component:PaymentComponent,title:"payment"},
    {path:'brands',component:BrandsComponent,title:"brands"},
    {path:'categoryproducts/:id',component:CategoryproductsComponent,title:"categoryproducts"},
    {path:'brandsproducts/:id',component:BrandsproductsComponent,title:"brandsproducts"},
    {path:'allorders',component:AllOrdersComponent,title:"allorders"},
  ]},
  {path:"",component:AuthLayoutComponent,children:[
    {path:"login",component:LoginComponent,title:"login"},
    {path:"register",component:RegisterComponent,title:"register"}
  ]},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
