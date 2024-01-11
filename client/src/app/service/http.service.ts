import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../products';
  
@Injectable({
  providedIn: 'root'
})
export class PostService {

  private product:Products;

  public _url = 'http://localhost:8086/api/store'
   
  constructor(private httpClient: HttpClient) { }

  getData(){
    return this.httpClient.get(this._url);
  }

  getDataById(id){
    return this.httpClient.get(`${this._url}/${id}`)
  }

  postImg(img){
    return this.httpClient.post(this._url, img)
  }

  getSaleStatus(sale){
    return this.httpClient.get(`${this._url}/getStatus/${sale}`)
  }

  getUnpaidStatus(purchase){
    return this.httpClient.get(`${this._url}/getStatus/${purchase}`)
  }

  deleteProductById(id){
    return this.httpClient.delete(`${this._url}/${id}`)
  }

  deleteProducts(){
    return this.httpClient.delete(this._url);
  }

  findByDate(date){
    return this.httpClient.get(`${this._url}/getDate/${date}`)
  }

  findTopItems(date){
    return this.httpClient.get(`${this._url}/top/${date}`)
  }

  update(id:any, data:any){
    return this.httpClient.put(`${this._url}/update/${id}`, data)
  }


  
}