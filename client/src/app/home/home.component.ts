import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/http.service';
import $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Salestatusdata: any = [];
  imageUrl = 'data:image/jpeg;base64,';
  Purchasestatusdata: any = [];
  customDate: any;
  dataContainer: any = [];
  total: number = 0;
  maxQuant:any = [];
  getDate: boolean = false;
  nodata:boolean = false;

  constructor(private _postService: PostService) { }

  ngOnInit(): void {


    this.timeZone();
    this.changeDate();
    this.getDataByDate();

  }

  timeZone() {
    var d = new Date();
    this.customDate = `${d.getFullYear()}-${('0' + (d.getMonth()+ 1)).slice(-2)}-${('0' + (d.getDate())).slice(-2)}`
    console.log(this.customDate)
  }


  getSaleDetails() {
    this._postService.getSaleStatus('Sale').subscribe({
      next: (res) => {

        if(!res){
          this.nodata = true;
        }else{
          this.Salestatusdata = res;
        }
      }
    }), (error) => {
      alert('error in fetching')
    }
  }


  getPurchaseDetails() {
    this._postService.getUnpaidStatus('Purchase').subscribe({
      next: (res) => {

        if(!res){
          this.nodata = true;
        }else{
          this.Purchasestatusdata = res;
        }
      
      }
    }), (error) => {
      alert('error in fetching')
    }
  }

  getDataByDate() {
    this._postService.findByDate(this.customDate).subscribe({
      next: (data) => {
        this.dataContainer = data;

        
        if (this.dataContainer.length > 0) {
          for (let i = 0; i < this.dataContainer.length; i++) {
            this.total += this.dataContainer[i].totalamount;
          }
          var current_progress = 0;
          if (this.total > 0 && this.total <= 500) {
            current_progress += 25;
            $("#dynamic")
              .css("width", current_progress + "%")
              .attr("aria-valuenow", current_progress)
              .text(current_progress + "%");
          }
          if (this.total > 500 && this.total <= 1000) {
            current_progress += 50;
            $("#dynamic")
              .css("width", current_progress + "%")
              .attr("aria-valuenow", current_progress)
              .text(current_progress + "%");
            if (current_progress >= 100) { }
          }
          if (this.total > 1000 && this.total <= 1500) {
            current_progress += 75;
            $("#dynamic")
              .css("width", current_progress + "%")
              .attr("aria-valuenow", current_progress)
              .text(current_progress + "%");
            if (current_progress >= 100) { }
          }
          if (this.total > 2000) {
            current_progress += 100;
            $("#dynamic")
              .css("width", current_progress + "%")
              .attr("aria-valuenow", current_progress)
              .text(current_progress + "%");
          }
         
        } else {
          this.total = 0;
          current_progress = 0
          $("#dynamic")
            .css("width", current_progress + "%")
            .attr("aria-valuenow", current_progress)
            .text(current_progress + "%");
        }
      }
    })

    this.getDate = false;
  }

  
  changeDate() {
    this.total = 0;
    this.getDate = true;  
  }


}
