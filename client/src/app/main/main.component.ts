import { Component, OnInit, HostListener } from '@angular/core';
import { PostService } from '../service/http.service';
import { Product } from '../models/Product.model';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  products: Product[] = [];
  visibleProducts: Product[] = [];

  loading = true;

  imageUrl = 'data:image/jpeg;base64,';

  // SEARCH + FILTER
  searchText: string = '';
  selectedCategory: string = '';

  categories: string[] = [
    'Pens',
    'Pencils',
    'Notebooks',
    'Art Supplies',
    'Office Items'
  ];

  // Quick view
  selectedProduct: Product | null = null;

  // Lazy loading
  pageSize = 8;
  index = 0;

  showTop = false;

  constructor(
    private productService: PostService,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {

    this.productService.getAllPublicProducts().subscribe({
      next: (data: Product[]) => {

        this.products = data.map((p, index) => ({
          ...p,
          id: p.id ?? index
        }));

        this.resetProducts();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.loading = false;
      }
    });

  }

  // ================= FILTER =================

  filteredProducts(): Product[] {

    return this.products.filter(product => {

      const matchesSearch =
        product.name.toLowerCase()
          .includes(this.searchText.toLowerCase());

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

  // ================= RESET PRODUCTS =================

  resetProducts() {

    this.index = 0;
    this.visibleProducts = [];

    this.loadMore();

  }

  // ================= LAZY LOAD =================

  loadMore() {

    const filtered = this.filteredProducts();

    if (this.index >= filtered.length) return;

    const next = filtered.slice(this.index, this.index + this.pageSize);

    this.visibleProducts = [
      ...this.visibleProducts,
      ...next
    ];

    this.index += this.pageSize;

  }

  // ================= SCROLL =================

  @HostListener('window:scroll', [])
  scroll() {

    const pos = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;

    this.showTop = pos > 600;

    if (pos > height - 300) {
      this.loadMore();
    }

  }

  top() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ================= QUICK VIEW =================

  quickView(product: Product) {
    this.selectedProduct = product;
  }

  closePopup() {
    this.selectedProduct = null;
  }

  // ================= CART =================

  addToCart(product: Product) {
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