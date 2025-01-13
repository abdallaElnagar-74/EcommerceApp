import { EcommDataService } from './../ecomm-data.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { Product } from '../product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  constructor(private _WishlistService:WishlistService,private _EcommDataService:EcommDataService,private _Renderer2:Renderer2,private _ToastrService:ToastrService,private _CartService:CartService){}
  products:Product[] =[]
  wishListData:string[]=[]
  ngOnInit(): void {
    this._WishlistService.getUserWishList().subscribe({
      next:data=>{
        this.products = data.data
        const newData = data.data.map((item:any)=>item.id)
        this.wishListData=newData;
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
  addProduct(id:string,elem:HTMLButtonElement){
    this._Renderer2.setAttribute(elem,"disabled",'true')
    this._CartService.addToCart(id).subscribe({
      next:data=>{
        this._CartService.cartNumber.next(data.numOfCartItems)
        this._ToastrService.success(data.message)
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
  removeItem(id:string):void
  { 
    this._WishlistService.removeProduct(id).subscribe({
      next:data=>{
        this.wishListData=data.data
        this._ToastrService.success('Product removed successfuly from your wishlist')
        let newData=this.products.filter((item:any)=> this.wishListData.includes(item.id))
        this.products=newData;
        // console.log(this.products.length);
        this._WishlistService.listNum.next(this.products.length)
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
}
