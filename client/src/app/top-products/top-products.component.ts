import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/http.service';
import $ from 'jquery';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent implements OnInit {

  url: any = 'http://localhost:3000/images/';
  customDate: any;
  topData:any= [];
  maxQuantity: any;
  getDate: boolean = false;
  nodata: boolean = false;
  imageUrl = 'data:image/jpeg;base64,';

  constructor(private _postService: PostService) { }

  ngOnInit(): void {
        this.timeZone();
        this.getQuantity();
  }

  timeZone() {
    var d = new Date();
    this.customDate = `${d.getFullYear()}-${('0' + (d.getMonth()+1)).slice(-2)}-${('0' + (d.getDate())).slice(-2)}`
    console.log(this.customDate)
  }


  getQuantity(){
    this._postService.findTopItems(this.customDate).subscribe(res =>{
      if(!res){
        this.nodata = true; 
      }else{
        this.nodata = false;
        this.topData  = res;
      }
    })

    this.getDate = false
  }

changeDate(){
  this.getDate = true;
}

}
