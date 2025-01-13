import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient:HttpClient) { }
  getAllBrands(pageNum:number =1):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands?page=${pageNum}&&limit=20`)
  }
  
}
