import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  cartID:string|null=''
  isLoading:boolean=false
  constructor(private _OrderService:OrderService,private _ActivatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartID=params.get('id')
        
      }
    })
  }
  payForm:FormGroup= new FormGroup({
    details:new FormControl(null,[Validators.required,Validators.minLength(8)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
    city:new FormControl(null,[Validators.required]),
  })

  checkOut(){
    this.isLoading=true
    this._OrderService.visaPayApi(this.cartID,this.payForm.value).subscribe({
      next:data=>{
        this.isLoading=false
        console.log(data);
        
        if(data.status=="success"){
          window.open(data.session.url,'_self')
        }
      },
      error:err=>{
        console.log(err);
        this.isLoading=false
      }
    })
    
  }
}
