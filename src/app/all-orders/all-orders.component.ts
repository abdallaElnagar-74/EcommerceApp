import { CartItem, ShippingAddress } from './../order';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../order';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  UserId:any
  orderDetails:Order[] =[]
  carItems:any
  constructor(private _OrderService:OrderService,private _AuthService:AuthService){}
  ngOnInit(): void {
    this._AuthService.saveUserData()
    this.UserId=this._AuthService.userDataVar.getValue().id
    this._OrderService.getUserOrders(this.UserId).subscribe({
      next:data=>{
        this.orderDetails=data
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }

}
