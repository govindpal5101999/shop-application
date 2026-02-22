import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PostService } from '../service/http.service';

@Injectable({
    providedIn: 'root'
})
export class TopProductsResolver implements Resolve<any> {

    constructor(private postService: PostService) { }

    resolve() {
        const d = new Date();
        const today = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;

        return this.postService.findTopItems(today);
    }
}