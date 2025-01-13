import { AuthService } from './../auth.service';
import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService,private _Router:Router ,private _FormBuilder:FormBuilder,private _Renderer2:Renderer2){}
  errmsg!:string;
  isLoading:boolean=false;



  eyePass:boolean=true
  eyeRePass:boolean=true

  toggleEyePass(){
    return this.eyePass = !this.eyePass
  }
  toggleEyeRePass()
  {
    return this.eyeRePass =!this.eyeRePass
  }

  registerForm:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]/),Validators.minLength(6)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]/),Validators.minLength(6)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)])
  },this.passConfirm)

  // registerForm:FormGroup = this._FormBuilder.group({
  //   name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(8)]],
  //   email:[null,[Validators.required,Validators.email]],
  //   password:[null,[Validators.required,Validators.pattern(/^[A-Z]/),Validators.minLength(6)]],
  //   rePassword:[null,[Validators.required,Validators.pattern(/^[A-Z]/),Validators.minLength(6)]],
  //   phone:[null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)]],
  // },this.passConfirm)


  registerSubmitMethod(){
    if(this.registerForm.valid == true){
      this.isLoading=true
      this._AuthService.registerAPI(this.registerForm.value).subscribe({
        next:data=>{
          this.isLoading=false
          console.log(data);
          if(data.message=="success"){
            this._Router.navigate(['/login'])
          }
        },
        error:err=>{
          this.isLoading=false
          console.log(err.error.message);
          this.errmsg=err.error.message
        }
      })
    }
    else{
      this.registerForm.markAllAsTouched()
    }
  }
  passConfirm(g:any){
    if(g.get('password').value == g.get('rePassword').value){
      return null
    }
    else{
      return {"notMatched":true}
    }
  }
}
