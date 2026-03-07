import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem.model';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: CartItem[] = [];

  getCart(): CartItem[] {
    return this.cart;
  }

  add(product: Product) {

    if (product.availableQty <= 0) return;

    const existing = this.cart.find(c => c.id === product.id);

    if (existing) {
      this.increase(product.id);
    } else {
      product.availableQty--;   // 🔥 reduce stock

      this.cart.push({
        id: product.id,
        product: product,
        quantity: 1,
        price: product.unitPrice,
        total: product.unitPrice
      });
    }
  }

  increase(id: number) {
    const item = this.cart.find(c => c.id === id);
    if (!item) return;

    if (item.product.availableQty <= 0) return;

    item.product.availableQty--;   // 🔥 reduce stock
    item.quantity++;
    item.total = item.quantity * item.price;
  }

  decrease(id: number) {
    const item = this.cart.find(c => c.id === id);
    if (!item) return;

    item.product.availableQty++;   // 🔥 restore stock
    item.quantity--;

    if (item.quantity <= 0) {
      this.remove(id);
    } else {
      item.total = item.quantity * item.price;
    }
  }

  remove(id: number) {
    const item = this.cart.find(c => c.id === id);
    if (!item) return;

    item.product.availableQty += item.quantity;  // 🔥 restore full stock
    this.cart = this.cart.filter(c => c.id !== id);
  }

  getTotalCount(): number {
    return this.cart.reduce((sum, c) => sum + c.quantity, 0);
  }

  getGrandTotal(): number {
    return this.cart.reduce((sum, c) => sum + c.total, 0);
  }

  clearCart() {
    this.cart = [];
  }
}