import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute

@Component({
  selector: 'app-bill-preview',
  templateUrl: './bill-preview.component.html',
  styleUrls: ['./bill-preview.component.scss']
})
export class BillPreviewComponent implements OnInit {

  bill: any;
  grandTotal: number;

  constructor() { }

  ngOnInit(): void {
    // Access the bill data passed via the router's state
    this.bill = history.state.bill;

    if (this.bill) {
      this.calculateGrandTotal();
    } else {
      alert('No bill data available!');
    }
  }

  calculateGrandTotal() {
    this.grandTotal = this.bill.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  confirmBill() {
    window.print();
  }

  goBack() {
    window.history.back();  // Go back to the previous page
  }
}