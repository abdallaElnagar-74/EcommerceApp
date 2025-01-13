import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onSale'
})
export class OnSalePipe implements PipeTransform {

  transform(pName:string): string {
    return `OnSale ${pName}`;
  }

}
