import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../products';
import { environment } from 'src/environments/environment';
import { Inventory } from '../models/inventory.model';
import { Product } from '../models/Product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private product: Products;

  // public _url = 'http://localhost:8086/api/products';
  // public url = 'http://localhost:8086/api/sales';
  public url = `${environment.apiUrl}/api/sales`;
  public _url = `${environment.apiUrl}/api/products`;

  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get(this._url);
  }

  getDataById(id) {
    return this.httpClient.get(`${this._url}/${id}`)
  }

  postImg(img) {
    return this.httpClient.post(this._url, img)
  }

  getSaleStatus(sale) {
    return this.httpClient.get(`${this._url}/getStatus/${sale}`)
  }

  getUnpaidStatus(purchase) {
    return this.httpClient.get(`${this._url}/getStatus/${purchase}`)
  }

  deleteProductById(id) {
    return this.httpClient.delete(`${this._url}/${id}`)
  }

  deleteProducts() {
    return this.httpClient.delete(this._url);
  }

  findByDate(date) {
    return this.httpClient.get(`${this._url}/getDate/${date}`)
  }

  getTopSelling() {
    return this.httpClient.get<any[]>(`${this.url}/top-selling`);
  }

  update(id: any, data: any) {
    return this.httpClient.put(`${this._url}/update/${id}`, data)
  }

  getStocks() {
    return this.httpClient.get<Inventory[]>(
      `${this._url}/inventory`
    );
  }

  generateBill(data: any[]) {
    return this.httpClient.post(`${this._url}/sales`, data);
  }

  getAllPublicProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this._url}/inventory/public`
    );
  }

}