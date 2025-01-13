import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { OnSalePipe } from './on-sale.pipe';
import { SearchPipe } from './search.pipe';
import { ToastrModule } from 'ngx-toastr';

import { NgxPaginationModule } from 'ngx-pagination';
import { MyHttpInterceptor } from './my-http.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './loading.interceptor';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { NavauthComponent } from './navauth/navauth.component';
import { NavblankComponent } from './navblank/navblank.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailsComponent } from './details/details.component';
import { HomeSlider1Component } from './home-slider1/home-slider1.component';
import { HomeSlider2Component } from './home-slider2/home-slider2.component';
import { PaymentComponent } from './payment/payment.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SettingComponent } from './setting/setting.component';
import { CategoryproductsComponent } from './category-products/categoryproducts/categoryproducts.component';
import { BrandsproductsComponent } from './category-products/brandsproducts/brandsproducts.component';

@NgModule({
  declarations: [
    AppComponent,HomeComponent,BrandsComponent,CategoriesComponent,CartComponent,ProductsComponent,NavauthComponent,
    NavblankComponent,LoginComponent,
    RegisterComponent,
    FooterComponent,
    BlankLayoutComponent,
    AuthLayoutComponent,
    NotFoundComponent,
    DetailsComponent,
    HomeSlider1Component,
    HomeSlider2Component,
    OnSalePipe,
    SearchPipe,
    PaymentComponent,
    AllOrdersComponent,
    WishlistComponent,
    SettingComponent,
    CategoryproductsComponent,
    BrandsproductsComponent,
    // AppComponent,
    // HomeComponent,
    // BrandsComponent,
    // CategoriesComponent,
    // CartComponent,
    // ProductsComponent,
    // NavauthComponent,
    // NavblankComponent,
    // LoginComponent,
    // RegisterComponent,
    // FooterComponent,
    // BlankLayoutComponent,
    // AuthLayoutComponent,
    // NotFoundComponent,
    // DetailsComponent,
    // HomeSlider1Component,
    // HomeSlider2Component,
    // OnSalePipe,
    // SearchPipe,
    // PaymentComponent,
    // AllOrdersComponent,
    // WishlistComponent,
    // SettingComponent,
  ],
  imports: [FormsModule,ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,HttpClientModule,RouterModule,BrowserAnimationsModule,CarouselModule,NgxPaginationModule,NgxSpinnerModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:MyHttpInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
