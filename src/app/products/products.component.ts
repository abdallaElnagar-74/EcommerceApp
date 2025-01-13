import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { EcommDataService } from '../ecomm-data.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  inputValue:string =''
  allProducts:Product[]= [] 
  pageSize:number =0;
  currentPage:number=0;
  total:number=0
  wishListData:string[]=[]

  constructor(private _EcommDataService:EcommDataService,private _CartService:CartService,private _ToastrService:ToastrService,private _WishlistService:WishlistService){}
  ngOnInit(): void {
    this._EcommDataService.getAllProducts().subscribe(
      {
        next:data=>{
          this.allProducts = data.data
          this.pageSize= data.metadata.limit;
          this.currentPage=data.metadata.currentPage;
          this.total=data.results
        },
        error:err=>{
        }
      }
    )
    this._WishlistService.getUserWishList().subscribe({
      next:data=>{
        const newData = data.data.map((item:any)=>item.id)
        this.wishListData = newData
      }
    })
  }
  addProduct(id:any,elem:HTMLButtonElement){
    this._CartService.addToCart(id).subscribe({
      next:data=>{
        this._ToastrService.success(data.message)
        this._CartService.cartNumber.next(data.numOfCartItems)
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
  pageChanged(event:any){
    this._EcommDataService.getAllProducts(event).subscribe({
      next:data=>{
        this.allProducts = data.data;
        this.pageSize = data.metadata.limit;
        this.currentPage = data.metadata.currentPage;
        this.total = data.results;
      },
      error:err=>{
        console.log(err);
        
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
}
