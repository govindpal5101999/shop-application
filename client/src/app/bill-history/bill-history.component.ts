import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill-history',
  templateUrl: './bill-history.component.html',
  styleUrls: ['./bill-history.component.scss']
})
export class BillHistoryComponent {


  constructor(private router: Router) { }
  onPurchaseHistory() {
    this.router.navigate(['/purchase-history']);
  }

  onSaleHistory() {
    this.router.navigate(['/sale-history']);
  }
}