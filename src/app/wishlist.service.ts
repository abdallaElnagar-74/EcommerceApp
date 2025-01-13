import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl:string='https://ecommerce.routemisr.com'
  listNum:BehaviorSubject<number> = new BehaviorSubject(0)
  constructor(private _HttpClient:HttpClient) { }

  addToWishList(prodId:string):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`,{
      productId:prodId
    })
  }
  getUserWishList():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`)
  }
  removeProduct(prodId:string):Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${prodId}`)
  }
}
