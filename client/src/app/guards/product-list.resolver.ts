import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from '../service/http.service';

@Injectable({
    providedIn: 'root'
})
export class ProductListResolver implements Resolve<any> {

    constructor(private productService: PostService) { }

    resolve(): Observable<any> {
        return this.productService.getData();
    }
}