import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PostService } from '../service/http.service';

@Injectable({
    providedIn: 'root'
})
export class TopProductsResolver implements Resolve<any> {

    constructor(private postService: PostService) { }

    resolve() {
        return this.postService.getTopSelling();
    }
}