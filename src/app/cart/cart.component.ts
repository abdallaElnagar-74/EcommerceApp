import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartDetails:any = null

  constructor(private _CartService:CartService,private _Renderer2:Renderer2){}
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:data=>{
        this.cartDetails=data.data
        
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
  removeCartItem(id:string,elem:HTMLButtonElement):void{
    this._Renderer2.setAttribute(elem,"disabled",'true')
    this._CartService.removeCartItem(id).subscribe({
      next:data=>{
        this._Renderer2.removeAttribute(elem,"disabled")
        this.cartDetails=data.data
        this._CartService.cartNumber.next(data.numOfCartItems)
      },
      error:err=>{
        console.log(err);
        this._Renderer2.removeAttribute(elem,"disabled")
      }
    })
  }
  changeCount(id:string,count:number,elem1:HTMLButtonElement,elem2:HTMLButtonElement){
    this._Renderer2
    if(count>0){
      this._Renderer2.setAttribute(elem1,"disabled",'true')
      this._Renderer2.setAttribute(elem2,"disabled",'true')
      this._CartService.updateCartQuantity(id,count).subscribe({
        next:data=>{
          this.cartDetails=data.data
          this._Renderer2.removeAttribute(elem1,"disabled")
        this._Renderer2.removeAttribute(elem2,"disabled")
        },
        error:err=>{
          console.log(err);
          this._Renderer2.removeAttribute(elem1,"disabled")
        this._Renderer2.removeAttribute(elem2,"disabled")
        }
      })
    }
    else{
      this._CartService.removeCartItem(id).subscribe({
        next:data=>{
          this.cartDetails=data.data
          this._CartService.cartNumber.next(data.numOfCartItems)
          
        },
        error:err=>{
          console.log(err);
          
        }
      })
    }
  }
  clearCart(){
    this._CartService.clearUserCart().subscribe({
      next:data=>{
        console.log(data);
        if(data.message=="success"){
          this.cartDetails=null
          this._CartService.cartNumber.next(0)

        }
      },
      error:err=>{
        console.log(err);
      }
    })
  }
}
