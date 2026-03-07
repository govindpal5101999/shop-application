import { Injectable } from '@angular/core';
import { BillItem } from '../models/bill-item.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Bill {
    billNumber: string;
    date: Date;
    items: BillItem[];
    grandTotal: number;
}

@Injectable({
    providedIn: 'root'
})
export class BillingService {

    public url = `${environment.apiUrl}/api/sales`;
    public _url = `${environment.apiUrl}/api/products`;

    constructor(private httpClient: HttpClient) { }

    getBillByNumber(billNumber: string): Observable<any> {
        return this.httpClient.get<any>(`${this.url}/bills/${billNumber}`);
    }

    getBillHistory(): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.url}/bills`);
    }

    getPurchaseBillByNumber(billNumber: string): Observable<any> {
        return this.httpClient.get<any>(`${this._url}/bills/${billNumber}`);
    }

    getPurchaseBillHistory(): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this._url}/bills`);
    }
}