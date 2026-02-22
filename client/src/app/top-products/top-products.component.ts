import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../service/http.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent implements OnInit {

  customDate!: string;
  topData: any;
  nodata: boolean = false;
  getDate: boolean = false;

  imageUrl = 'data:image/jpeg;base64,';

  constructor(private route: ActivatedRoute, private _postService: PostService) { }

  ngOnInit(): void {
    this.setTodayDate();

    // ✅ data from resolver
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

  getQuantity() {
    // Ensure you show the spinner or some loading indicator if needed
    this._postService.findTopItems(this.customDate).subscribe(res => {
      if (!res) {
        this.nodata = true; // Show no data message if the response is empty
      } else {
        this.nodata = false; // Hide no data message if the response is valid
        this.topData = res; // Update your topData array with the new data
      }
    });

    // Reset the getDate flag (disable the button after clicking)
    this.getDate = false;
  }
}