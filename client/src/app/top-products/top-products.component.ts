import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent implements OnInit {

  customDate!: string;
  topData: any[] = [];
  nodata: boolean = false;
  getDate: boolean = false;

  imageUrl = 'data:image/jpeg;base64,';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setTodayDate();

    const resolvedData = this.route.snapshot.data['topProducts'];

    this.topData = Array.isArray(resolvedData) ? resolvedData : [];
    this.nodata = this.topData.length === 0;
  }

  setTodayDate() {
    const d = new Date();
    this.customDate = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
  }

  changeDate() {
    this.getDate = true;
  }
}