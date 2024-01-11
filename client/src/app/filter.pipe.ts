import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../app/products';

@Pipe({
  name: 'customfilterfilter'
})
export class FilterPipe implements PipeTransform{

  transform(products: Products[], searchName: string){
    if(products.length === 0 || searchName === ""){
      return products;
    }else{
    return  products.filter((product) =>{
        return  product.Name.toLowerCase() === searchName.toLowerCase()
      })
    }
  }

}
