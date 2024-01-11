import { Component } from '@angular/core';
import { PostService } from './service/http.service';
import {Products} from './products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Avind Store WepApp';

  constructor(private _postService:PostService, private router: Router){}

  // newProduct(event){
  //   event.preventDefault();
  //   this._postService.setter(new Products());
  //   this.router.navigate(['/productupdate'])

  // }
}
