import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent {

  paymentMode = 'COD';

  constructor(public cartService: CartService) { }

  get subtotal() {
    return this.cartService.getGrandTotal();
  }

  get tax() {
    return this.subtotal * 0.05;
  }

  get total() {
    return this.subtotal + this.tax;
  }

  placeOrder() {
    alert('Order placed successfully!');
    this.cartService.clear();
  }
}