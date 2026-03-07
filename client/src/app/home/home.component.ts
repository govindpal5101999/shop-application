import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/http.service';
import { Product } from '../models/Product.model';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  imageUrl = 'data:image/jpeg;base64,';

  categories: string[] = [
    'Pens',
    'Pencils',
    'Notebooks',
    'Art Supplies',
    'Office Items'
  ];

  searchText: string = '';
  selectedCategory: string = '';

  constructor(private productService: PostService, public cartService: CartService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllPublicProducts().subscribe({
      next: (data: Product[]) => {

        // Assign temporary unique id if backend not sending one
        this.products = data.map((p, index) => ({
          ...p,
          id: p.id ?? index
        }));

      },
      error: (err) => {
        console.error('Error fetching products', err);
      }
    });
  }

  // Filter logic
  filteredProducts(): Product[] {
    return this.products.filter(product => {

      const matchesSearch =
        product.name.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesCategory =
        this.selectedCategory
          ? this.getCategory(product) === this.selectedCategory
          : true;

      return matchesSearch && matchesCategory;
    });
  }

  getCategory(product: Product): string {

    const name = product.name.toLowerCase();

    if (name.includes('pen')) return 'Pens';
    if (name.includes('pencil')) return 'Pencils';
    if (name.includes('book') || name.includes('notebook')) return 'Notebooks';
    if (name.includes('color') || name.includes('brush')) return 'Art Supplies';

    return 'Office Items';
  }


  // ===== CART LOGIC =====

  addToCart(product: Product) {
    if (!this.auth.isLoggedIn()) {
      alert("Please login to add items to cart");
      this.router.navigate(['/login']);
      return;
    }

    // If logged in -> add to cart
    this.cartService.add(product);
  }

  isInCart(product: Product): boolean {
    return this.cartService.getCart().some(i => i.id === product.id);
  }

  getCartItem(product: Product) {
    return this.cartService.getCart().find(i => i.id === product.id);
  }

  increase(product: Product) {
    this.cartService.increase(product.id);
  }

  decrease(product: Product) {
    this.cartService.decrease(product.id);
  }

  getTotalCount() {
    return this.cartService.getTotalCount();
  }

}