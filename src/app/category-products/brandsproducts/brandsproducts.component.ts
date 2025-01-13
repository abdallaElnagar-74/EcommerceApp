import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart.service';
import { EcommDataService } from 'src/app/ecomm-data.service';
import { Product } from 'src/app/product';
import { WishlistService } from 'src/app/wishlist.service';

@Component({
  selector: 'app-brandsproducts',
  templateUrl: './brandsproducts.component.html',
  styleUrls: ['./brandsproducts.component.scss']
})

export class BrandsproductsComponent implements OnInit {
  brandId:any
  brandProducts:Product[]=[]
  wishListData:string[] =[]
  constructor(private _WishlistService:WishlistService,private _Renderer2:Renderer2,private _ToastrService:ToastrService,private _CartService:CartService,private _EcommDataService:EcommDataService,private _ActivatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:data=>{
        this.brandId = data.get('id')
        
      }
    })
    this._EcommDataService.getAllBrandProducts(this.brandId).subscribe({
      next:data=>{
        this.brandProducts = data.data
      }
    })
    this._WishlistService.getUserWishList().subscribe({
      next:data=>{
        const newData = data.data.map((item:any)=>item.id);
        this.wishListData = newData
      }
    })
  }
  addProduct(id:any,elem:HTMLButtonElement):void{
    this._Renderer2.setAttribute(elem,'disabled','true')
    this._CartService.addToCart(id).subscribe({
      next:data=>{
        console.log(data);
        this._CartService.cartNumber.next(data.numOfCartItems)
        this._ToastrService.success(data.message)
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
  addToWish(id:any):void
  {
    this._WishlistService.addToWishList(id).subscribe({
      next:data=>{
        this.wishListData = data.data
        this._WishlistService.listNum.next(data.data.length)
        this._ToastrService.success(data.message)
        
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
  removeFromWish(id:any):void
  {
    this._WishlistService.removeProduct(id).subscribe({
      next:data=>{
        this.wishListData = data.data
        this._WishlistService.listNum.next(data.data.length)
        this._ToastrService.success("Product removed successfully from your wishlist")
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
}
