import { Component } from '@angular/core';
import { LoaderService } from '../../core/loader.service';

@Component({
  selector: 'app-full-screen-loader',
  templateUrl: './full-screen-loader.component.html',
  styleUrls: ['./full-screen-loader.component.scss']
})
export class FullScreenLoaderComponent {
  loading$ = this.loaderService.loading$;

  constructor(private loaderService: LoaderService) { }
}