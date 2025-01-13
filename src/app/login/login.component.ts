import { AuthService } from './../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  isVisible:boolean=false
  errmsg!:string
  isLoading:boolean=false;
  sendingCode:boolean=false;
  codeSent:string='';
  codeSentErr:string=''

  showSendcodeFlag:boolean=true;
  showverifyFlag:boolean=false;
  showrenewpassFlag:boolean=false;

  

  eye:boolean=true

  toggleEye(){
    return this.eye = !this.eye
  }


  constructor(private _AuthService:AuthService,private _Router:Router,private _Renderer2:Renderer2){}
  loginForm:FormGroup= new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]/),Validators.minLength(6)]),
  }) 
  loginSubmitMethod(){
    if(this.loginForm.valid == true && !this.isLoading){
      this.isLoading=true;
      this._AuthService.loginAPI(this.loginForm.value).subscribe({
        next:data=>{
          this.isLoading=false
          console.log(data.message);
          if(data.message){

            localStorage.setItem('userToken',data.token)
            this._AuthService.saveUserData()
            console.log("name"+this._AuthService.userDataVar.getValue().name);
            localStorage.setItem('userName',this._AuthService.userDataVar.getValue().name)
            this._Router.navigate(['/home'])
            
          }
        },
        error:err=>{
          this.isLoading=false
          this.errmsg=err.error.message
          console.log(err.error.message);
          
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched()
    }
  }
// ================sencode form start====================
  sendVerificationForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })
  sendCodeMethod(){
    this.sendingCode=true
    this._AuthService.forgetPassAPI(this.sendVerificationForm.value).subscribe({
      next:data=>{
        
        if(data.message){
          this.codeSent=data.message
          this.codeSentErr=''
          this.sendingCode=false
          this.showSendcodeFlag=false;
          this.showverifyFlag=true
        }
        console.log(data);
        
      },
      error:err=>{
        this.codeSentErr=err.error.message
        this.codeSent=''
        console.log(err);
        this.sendingCode=false
      }
    })
  }
// ================sendcode form end====================
// ================verify form start====================

  verifyCodeForm:FormGroup= new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.maxLength(6)])
  })
  verifyCodeMethod(){
    this.sendingCode=true
    this._AuthService.verifyResetCodeAPI(this.verifyCodeForm.value).subscribe({
      next:data=>{
        this.sendingCode=false
        console.log(data);
        this.codeSent=data.status
        this.codeSentErr= ''
        this.showverifyFlag=false;
        this.showrenewpassFlag=true;

      },
      error:err=>{
        this.sendingCode=false
        this.codeSentErr= err.error.message
        this.codeSent=''
        console.log(err.error.message);

      }
    })
  }
// ================verify form end====================
// ================newPass form start====================

renewPasswordForm:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
  newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]/),Validators.minLength(6)]),
})
newPasswordMethod(){
  this._AuthService.resetPasswordAPI(this.renewPasswordForm.value).subscribe({
    next:data=>{
      this.codeSent
      console.log(data);
      this.isVisible=false
    },
    error:err=>{
      console.log(err);
      
    }
  })
}
// ================newPass form end====================



  closeForm(event:any){
    event.stopPropagation()
  }


}

