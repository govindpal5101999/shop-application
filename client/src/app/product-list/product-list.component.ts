import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../service/http.service';
import { Products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  searchItem: any;
  public products: Products[] = [];
  public Allproducts: any[] = [];

  imageUrl = 'data:image/jpeg;base64,';
  nodata: boolean = false;
  alert: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // DATA COMES FROM RESOLVER
    this.Allproducts = this.route.snapshot.data['products'];

    if (!this.Allproducts || this.Allproducts.length === 0) {
      this.nodata = true;
    }
  }

  // getProducts() REMOVED

  deleteAllProducts() {
    const response = confirm("Are you sure? Click OK to proceed otherwise click Cancel.");

    if (response) {
      this._postService.deleteProducts().subscribe({
        next: () => {
          // reload page data after delete
          this.reloadRoute();
        },
        error: (err) => console.log(err)
      });
    }
  }

  delete(pro: any) {
    this._postService.deleteProductById(pro).subscribe({
      next: () => {
        alert('Deleted Successfully');
        this.reloadRoute();
      },
      error: (err) => console.log(err)
    });
  }

  // reload route to trigger resolver again
  reloadRoute() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/productList']);
    });
  }
}