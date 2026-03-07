import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(public auth: AuthService, public cartService: CartService, private router: Router) { }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.cartService.clearCart();
  }

  goToCart() {
    this.router.navigate(['/purchase']);
  }

}