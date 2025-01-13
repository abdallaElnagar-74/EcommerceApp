import { CartService } from './../cart.service';
import { AuthService } from './../auth.service';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

declare let $:any;

@Component({
  selector: 'app-navblank',
  templateUrl: './navblank.component.html',
  styleUrls: ['./navblank.component.scss']
})

export class NavblankComponent implements OnInit {
  
  
  eyeCurrentPass:boolean = true
  eyeNewPass:boolean = true
  eyerePass:boolean = true
  userName:any
  cartNum:number=0
  wishNum:number=0
  setting:boolean=false
  showsetting:boolean=false
  nameSettingFlag:boolean=false
  passSettingFlag:boolean=false
  phoneSettingFlag:boolean=false
  emailSettingFlag:boolean=false
  isLoading:boolean=false
  msgError:string =''
  inputNameValue:string =''
  inputCurrentPassValue:string =''
  inputNewPassValue:string =''
  inputRePassValue:string =''
  inputEmailValue:string =''
  inputPhoneValue:string =''

  toggleEyeCurrentPass(){
    this.eyeCurrentPass = !this.eyeCurrentPass
  }
  toggleEyeNewPass(){
    this.eyeNewPass = !this.eyeNewPass
  }
  toggleEyerePass(){
    this.eyerePass = !this.eyerePass
  }

closeAllSetting():void
{
  this.showsetting=false
  this.nameSettingFlag=false;
  this.passSettingFlag=false;
  this.phoneSettingFlag=false;
  this.emailSettingFlag=false;
  this.setting =false
}

stop(event:any):void
{
  event.stopPropagation()
}

  toglleSetting(){
    // this.setting= !this.setting
    $(".setting").slideToggle(500)
  }
  constructor(private  _ToastrService:ToastrService,private _AuthService:AuthService,private _CartService:CartService,private _Renderer2:Renderer2,private _WishlistService:WishlistService){}

@ViewChild('navBar') navElement!:ElementRef

@HostListener('window:scroll')
  onScroll(){
    if(window.scrollY > 500){
      this._Renderer2.addClass(this.navElement.nativeElement ,'py-3')
      this._Renderer2.addClass(this.navElement.nativeElement ,'shadow')
      this._Renderer2.addClass(this.navElement.nativeElement ,'bg-body-tertiary')
    }
    else{
      this._Renderer2.removeClass(this.navElement.nativeElement ,'py-3')
      this._Renderer2.removeClass(this.navElement.nativeElement ,'shadow');
      this._Renderer2.removeClass(this.navElement.nativeElement ,'bg-body-tertiary')

    }
    
  }


ngOnInit(): void {
  $('.setting').hide()
  this._AuthService.userDataVar.subscribe(()=>{
    if(localStorage.getItem('userName')!=null){
      this.userName = localStorage.getItem('userName')
    }
  })
  this._CartService.cartNumber.subscribe({
    next:data=>{
      this.cartNum=data
      
    }
  })
  this._CartService.getUserCart().subscribe({
    next:data=>{
      this.cartNum = data.numOfCartItems
    }
  })
  this._WishlistService.listNum.subscribe({
    next:data=>{
      this._WishlistService.getUserWishList().subscribe({
        next:data=>{
          this.wishNum = data.count
        }
      })
    }
  })
}
  logOutUser():void{
    this._AuthService.logOut()
  }

  
// ==================================nameForm Start=================== 
  nameForm:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required])
  })
  changeName(){
    this.isLoading=true
    this._AuthService.UpdateLoggedUserData(this.nameForm.value).subscribe({
      next:data=>{
        this.isLoading=false
        this.showsetting = false
        $('.setting').hide()
        console.log(data.user.name);
        this._AuthService.userDataVar.next(data.user.name)
        localStorage.setItem('userName',data.user.name)
        this.userName = localStorage.getItem('userName')
        this.inputNameValue=''
        this._ToastrService.success('Name Changed Successfully')
      },
      error:err=>{
        console.log(err);
        this.isLoading=false
        
      }
    })
  }
// ==================================nameForm End=================== 



// ==================================passForm start=================== 
  passForm:FormGroup = new FormGroup({
    currentPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]/),Validators.minLength(6)]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]/),Validators.minLength(6)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]/),Validators.minLength(6)]),
  },this.confirmPass)
  changePass(){
    this.isLoading=true
    this._AuthService.UpdateLoggedUserPassword(this.passForm.value).subscribe({
      next:data=>{
        console.log(data);
        if(data.message == "success"){
          localStorage.setItem('userToken',data.token);
          this.isLoading=false
          this.showsetting = false
          this.setting=false
          this.inputCurrentPassValue=''
          this.inputNewPassValue=''
          this.inputRePassValue=''
          $('.setting').hide()
          this._ToastrService.success('Password Changed Successfully')
        }
        

      },
      error:err=>{
        console.log(err.error);
        this.isLoading=false
        this.msgError = err.error.errors.msg
      } 
    })
    
  }

  confirmPass(g:any):any
  {
    if(g.get('password').value == g.get('rePassword').value){
      return null
    }
    else{
      return {"misMathch":true}
    }
  }
// ==================================passForm End=================== 


// ==================================phoneForm Start=================== 
  phoneForm:FormGroup = new FormGroup({
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)])
  })
  changePhone(){
    this.isLoading=true
    this._AuthService.UpdateLoggedUserData(this.phoneForm.value).subscribe({
      next:data=>{
        console.log(data);
        this.isLoading=false
        this.showsetting = false
        this.setting=false
        this.inputPhoneValue=''
        $('.setting').hide()
        this._ToastrService.success('Phone Changed Successfully')
      },
      error:err=>{
        console.log(err);
        this.isLoading=false
      }
    })
  }
// ==================================phoneForm End=================== 



// ==================================emailForm Start=================== 
  emailForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })
  changeEmail(){
    this.isLoading=true
    this._AuthService.UpdateLoggedUserData(this.emailForm.value).subscribe({
      next:data=>{
        console.log(data);
        this.isLoading=false
        this.showsetting = false
        this.setting=false
        $('.setting').hide()
        this.inputEmailValue=''
        this._ToastrService.success('Email Changed Successfully')
      },
      error:err=>{
        console.log(err);
        this.isLoading=false
      }
    })
  }
  
}
// ==================================emailForm End=================== 
