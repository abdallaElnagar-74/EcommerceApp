import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcommDataService {

  baseUrl:string ='https://ecommerce.routemisr.com'
  constructor( private _HttpClient:HttpClient) { }
  getAllProducts(pageNum:number =1):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products?page=${pageNum}&&limit=12`)
  }
  getAllCatProducts(id:any):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products?category[in]=${id}`)
  }
  getAllBrandProducts(id:any):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products?brand=${id}`)
  }
  getProductDetails(id:string):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${id}`)
  }
  getAllCategories():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`)
  }
  getCategoryDetails(id:any):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories/${id}`)
  }
  getAllSubCategories():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/subcategories`)
  }
}
