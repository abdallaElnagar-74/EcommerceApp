import { WishlistService } from './../../wishlist.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { EcommDataService } from 'src/app/ecomm-data.service';
import { Product } from 'src/app/product';
import { CartService } from 'src/app/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categoryproducts',
  templateUrl: './categoryproducts.component.html',
  styleUrls: ['./categoryproducts.component.scss']
})
export class CategoryproductsComponent implements OnInit {
  catID!:string|null
  catProducts:Product[] = []
  wishListData:string[]=[]
  constructor(private _WishlistService:WishlistService,private _ToastrService:ToastrService,private _EcommDataService:EcommDataService,private _ActivatedRoute:ActivatedRoute,private _CartService:CartService,private _Renderer2:Renderer2){}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(
      {
        next:data=>{
          this.catID = data.get('id')
          
        }
      }
      
    )
    this._EcommDataService.getAllCatProducts(this.catID).subscribe({
      next:data=>{
        this.catProducts =data.data
      }
    })
    this._WishlistService.getUserWishList().subscribe({
      next:data=>{
        const newData = data.data.map((item:any)=> item.id)
        this.wishListData = newData
      }
    })
  }
  addProduct(id:any,elem:HTMLButtonElement){
    this._Renderer2.setAttribute(elem,'disabled','true')
    this._CartService.addToCart(id).subscribe({
      next:data=>{
        console.log(data);
        this._Renderer2.removeAttribute(elem,'disabled');
        this._ToastrService.success(data.message)
        this._CartService.cartNumber.next(data.numOfCartItems)
      },
      error:err=>{
        console.log(err);
        this._Renderer2.removeAttribute(elem,'disabled');
      }
    })
  }
  addToWish(id:any):void
  { 
    this._WishlistService.addToWishList(id).subscribe({
      next:data=>{
        this.wishListData=data.data
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
        this.wishListData=data.data
        this._ToastrService.success('Product removed successfully from your wishlist')
        this._WishlistService.listNum.next(data.data.length)
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
}
