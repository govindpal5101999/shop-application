import { Injectable } from '@angular/core';
import { BillItem } from '../models/bill-item.model';

@Injectable({
    providedIn: 'root'
})
export class BillingService {
    private currentBill: BillItem[] = [];

    getCurrentBill(): BillItem[] {
        return this.currentBill;
    }

    addToBill(item: BillItem) {
        this.currentBill.push(item);
    }

    generateBillNumber(): string {
        return 'BILL-' + new Date().getTime();
    }

    saveBill(billNumber: string, items: BillItem[]) {
        // send to backend or store locally
        console.log('Bill saved', billNumber, items);
        this.currentBill = []; // reset after saving
    }
}