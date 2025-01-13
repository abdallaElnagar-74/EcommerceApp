import { Component, OnInit, Renderer2 } from '@angular/core';
import { EcommDataService } from '../ecomm-data.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../wishlist.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  inputValue:string=''
  products:Product[]=[];
  wishListData:string[]=[]
  constructor(private _EcommDataService:EcommDataService,private _CartService:CartService,private _ToastrService:ToastrService,private _Renderer2:Renderer2,private _WishlistService:WishlistService){}
  ngOnInit(): void {
    this._EcommDataService.getAllProducts().subscribe({
      next:res=>{
        this.products = res.data
      }
    })
    this._WishlistService.getUserWishList().subscribe({
      next:data=>{
        const newData = data.data.map((item:any)=>item.id)
        this.wishListData = newData;
        
      }
    })
  }
  addProduct(productId:any,elem:HTMLButtonElement){
    this._Renderer2.setAttribute(elem,"disabled",'true')
    this._CartService.addToCart(productId).subscribe({
      next:data=>{
        this._ToastrService.success(data.message)
        this._Renderer2.removeAttribute(elem,"disabled")
        this._CartService.cartNumber.next(data.numOfCartItems)
        
      },
      error:err=>{
        console.log(err);
        this._Renderer2.removeAttribute(elem,"disabled")
      }
    })
  }
  addToWish(id:string){
    this._WishlistService.addToWishList(id).subscribe({
      next:data=>{
        this._ToastrService.success(data.message)
        this.wishListData= data.data;
        // console.log(this.wishListData);
        
        this._WishlistService.listNum.next(this.wishListData.length)

      },
      error:err=>{
        console.log(err);
      }
    })
  }
  removeFromWish(id:string){
    
    this._WishlistService.removeProduct(id).subscribe({
      next:data=>{
        this._ToastrService.success('Product removed successfuly from your wishlist')
        this.wishListData= data.data;
        // console.log(this.wishListData);

        this._WishlistService.listNum.next(this.wishListData.length)
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
}
