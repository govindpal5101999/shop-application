import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductsComponent } from './products/products.component';
import { TopProductsComponent } from './top-products/top-products.component';

const routes: Routes = [
  {
    path: '', redirectTo: "/home", pathMatch: "full"
  },
  {
    path: "home", component: HomeComponent
  },
  {
    path: "products", component: ProductsComponent
  },
  {
    path: "productList", component: ProductListComponent
  },
  {
    path: "productupdate/:id", component: ProductUpdateComponent
  },
  {
    path: "about", component: AboutComponent
  },
  {
    path: "topProducts", component: TopProductsComponent
  },
  {
    path: "contactUs", component: ContactUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
