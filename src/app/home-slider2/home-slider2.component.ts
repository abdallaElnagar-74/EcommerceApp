import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { EcommDataService } from '../ecomm-data.service';
import { Product } from '../product';
import { Categories } from '../categories';
@Component({
  selector: 'app-home-slider2',
  templateUrl: './home-slider2.component.html',
  styleUrls: ['./home-slider2.component.scss']
})
export class HomeSlider2Component implements OnInit {
  constructor(private _EcommDataService:EcommDataService){}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin:10,
    autoplay:true,
    autoplayTimeout:4000,
    autoplaySpeed:1500,
    navText: ['',''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  allCategories:Categories[] = []

  ngOnInit(): void {
    this.getCategories()
    
  }
  getCategories(){
    this._EcommDataService.getAllCategories().subscribe({
      next:data=>{
        this.allCategories = data.data
        
        
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
  
}
