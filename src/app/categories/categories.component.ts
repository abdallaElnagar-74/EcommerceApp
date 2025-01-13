import { Component, OnInit } from '@angular/core';
import { EcommDataService } from '../ecomm-data.service';
import { Category } from '../product';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  allCategories:any
  specificCategory:any
  isVisible:boolean=false
  constructor(private _EcommDataService:EcommDataService){}
  ngOnInit(): void {
    this._EcommDataService.getAllCategories().subscribe({
      next:data=>{
        this.allCategories=data.data
      }
    })
    
  }
}
