import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

interface dataSentApi{
  name?:string,
  email?:string,
  password?:string,
  rePassword?:string,
  phone?:string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDataVar:BehaviorSubject<any> =new BehaviorSubject(null)
  
  baseUrl:string ='https://ecommerce.routemisr.com'
  constructor(private _HttpClient:HttpClient,private _Router:Router) { }

  logOut():void{
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName')
    this._Router.navigate(['/login'])
  }

  saveUserData(){
      if(localStorage.getItem('userToken')!= null){
        this.userDataVar.next(localStorage.getItem('userToken'));
        this.userDataVar.next(jwtDecode(this.userDataVar.getValue()))
      }
    }
  registerAPI(bodyData:dataSentApi):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`,bodyData)
  }
  loginAPI(bodyData:dataSentApi):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`,bodyData)
  }
  forgetPassAPI(bodyData:dataSentApi):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`,bodyData)
  }
  verifyResetCodeAPI(bodyData:dataSentApi):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`,bodyData)
  }
  resetPasswordAPI(bodyData:dataSentApi):Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`,bodyData)
  }
  UpdateLoggedUserData(info:any):Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/users/updateMe/`,info)
  }
  UpdateLoggedUserPassword(info:any):Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/users/changeMyPassword`,info)
  }

}
