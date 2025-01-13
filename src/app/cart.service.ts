import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartNumber:BehaviorSubject<number>= new BehaviorSubject(0)

  
  
  baseUrl:string='https://ecommerce.routemisr.com'
  constructor(private _HttpClient:HttpClient) { }
  
  addToCart(prodId:string):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,{productId: prodId} );
  }
  getUserCart():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`)
  }
  removeCartItem(cartId:string):Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${cartId}`)
  }
  updateCartQuantity(prodId:string,countNum:number):Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${prodId}`,{count:countNum})
  }
  clearUserCart():Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`)
  }
}

