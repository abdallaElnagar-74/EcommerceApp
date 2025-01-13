import { Component } from '@angular/core';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {

  goUp():void{
    window.scrollTo(0,0);
  }
  goDown():void{
    window.scrollTo(0,90000);
  }
}
