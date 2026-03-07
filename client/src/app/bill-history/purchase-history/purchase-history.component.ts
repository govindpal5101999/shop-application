import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillingService } from 'src/app/service/billing.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {

  bills: any[] = [];

  constructor(private billingService: BillingService, private router: Router) { }

  ngOnInit(): void {
    this.billingService.getPurchaseBillHistory().subscribe((data: any[]) => {
      this.bills = data.map(bill => {
        const total = bill.items.reduce((sum: number, item: any) => sum + item.price, 0);
        return {
          billNumber: bill.number,
          items: bill.items,
          grandTotal: bill.totalAmount,
          date: bill.saleDate
        };
      });
    });
  }

  printBill(billNumber: string) {
    this.billingService.getPurchaseBillByNumber(billNumber).subscribe(bill => {
      const total = bill.items.reduce((sum: number, item: any) => sum + item.price, 0);

      const billHTML = `
        <html>
          <head>
            <title>Bill ${bill.number}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h2>Bill Number: ${bill.number}</h2>
            <p>Date: ${new Date().toLocaleString()}</p>
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${bill.items.map(i => `
                  <tr>
                    <td>${i.name}</td>
                    <td>${i.quantity}</td>
                    <td>₹${i.price}</td>
                  </tr>
                `).join('')}
                <tr>
                  <td colspan="2"><strong>Total</strong></td>
                  <td><strong>₹${total}</strong></td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>
      `;

      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(billHTML);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    });
  }

  backToHistory() {
    this.router.navigate(['bill-history'])
  }

}
