import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  allBrands:any
  brandDetails:any
  isVisible:boolean=false
  pageSize:number = 0;
  currentPage:number=0;
  total:number = 0
  constructor(private _BrandsService:BrandsService){}
  ngOnInit(): void {
    
    this._BrandsService.getAllBrands().subscribe({
      next:data=>{
        this.allBrands=data.data
        this.pageSize = data.metadata.limit;
        this.currentPage = data.metadata.currentPage;
        this.total = data.results;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  pageChanged(event:any){
    this._BrandsService.getAllBrands(event).subscribe({
      next:data=>{
        this.allBrands = data.data;
        this.pageSize = data.metadata.limit;
        this.currentPage = data.metadata.currentPage;
        this.total = data.results;
      },
      error:err=>{
        console.log(err);
        
      }
    })
    
  }
}
