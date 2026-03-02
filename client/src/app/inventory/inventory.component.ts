import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/http.service';
import { Inventory } from '../models/inventory.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  inventoryList: Inventory[] = [];
  filteredList: Inventory[] = [];
  searchText = '';



  cart: any[] = [];
  generatedBill: any;
  showPreview: boolean;
  imageUrl = 'data:image/png;base64,';

  constructor(private service: PostService, private router: Router) { }

  ngOnInit() {
    this.loadInventory();
  }

  loadInventory() {
    this.service.getStocks().subscribe(res => {
      this.inventoryList = res;
      this.filteredList = res;
    });
  }

  search() {
    this.filteredList = this.inventoryList.filter(p =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  addToCart(item: Inventory) {
    if (item.availableQty <= 0) return;

    // Prevent duplicates
    if (this.isInCart(item)) return;

    item.availableQty--;

    this.cart.push({
      item,
      name: item.name,
      price: item.unitPrice,
      qty: 1,
      get total() {
        return this.qty * this.price;
      }
    });
  }


  isInCart(item: Inventory) {
    return this.cart.some(c => c.name === item.name);
  }

  getCartItem(item: Inventory) {
    return this.cart.find(c => c.name === item.name);
  }

  increaseQty(cartItem: any) {
    if (cartItem.item.availableQty <= 0) return;

    cartItem.item.availableQty--;
    cartItem.qty++;
  }

  decreaseQty(cartItem: any) {
    cartItem.item.availableQty++;
    cartItem.qty--;

    if (cartItem.qty <= 0) {
      this.removeFromCart(cartItem);
    }
  }

  removeFromCart(cartItem: any) {
    // restore full quantity when removed
    cartItem.item.availableQty += cartItem.qty;
    this.cart = this.cart.filter(c => c !== cartItem);
  }

  get grandTotal() {
    return this.cart.reduce((sum, c) => sum + (c.qty * c.price), 0);
  }

  generateBill() {
    if (this.cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    const payload = this.cart.map(c => ({
      name: c.name,
      quantity: c.qty,
      unitPrice: c.price
    }));

    this.service.generateBill(payload).subscribe({
      next: (res) => {
        this.generatedBill = res;  // store it in a variable
        this.showPreview = true;
        this.cart = [];
        this.loadInventory(); // refresh stock

        // Navigate to Bill Preview Page with the bill data
        this.router.navigate(['/bill-preview'], { state: { bill: res } });
      },
      error: err => {
        alert(err.error || 'Failed to generate bill');
      }
    });
  }
}