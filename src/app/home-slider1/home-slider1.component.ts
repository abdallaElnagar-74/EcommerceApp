import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-slider1',
  templateUrl: './home-slider1.component.html',
  styleUrls: ['./home-slider1.component.scss']
})
export class HomeSlider1Component {
  constructor(){}
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:1500,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
}
