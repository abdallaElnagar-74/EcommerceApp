import { CartService } from './../cart.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcommDataService } from '../ecomm-data.service';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{

  
  constructor(private _ToastrService:ToastrService,private _ActivatedRoute:ActivatedRoute,private _Renderer2:Renderer2,private _EcommDataService:EcommDataService,private _CartService:CartService ){}

  productDetails:any;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let productId:any = params.get('id')
        this._EcommDataService.getProductDetails(productId).subscribe({
          next:response=>{
            this.productDetails = response.data
            
          }
        })
      }
    })
  }
  addProduct(id:string,elem:HTMLButtonElement){
    this._Renderer2.setAttribute(elem,"disabled","true")
    this._CartService.addToCart(id).subscribe({
      next:data=>{
        this._CartService.cartNumber.next(data.numOfCartItems)
        this._Renderer2.removeAttribute(elem,"disabled")
        this._ToastrService.success(data.message)
      },
      error:err=>{
        console.log(err);
        this._Renderer2.removeAttribute(elem,"disabled")
      }
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:1500,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}

