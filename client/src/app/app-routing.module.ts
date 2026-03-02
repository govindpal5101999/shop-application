import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductsComponent } from './products/products.component';
import { TopProductsComponent } from './top-products/top-products.component';
import { ProductListResolver } from './guards/product-list.resolver';
import { TopProductsResolver } from './guards/top-products.resolver';
import { InventoryComponent } from './inventory/inventory.component';
import { BillingComponent } from './billing/billing.component';
import { BillHistoryComponent } from './bill-history/bill-history.component';
import { BillPreviewComponent } from './billing/bill-preview/bill-preview.component';
import { LoginComponent } from './login/login.component';
import { RoleGuard } from './auth/role.guard';
import { SignupComponent } from './signup/signup.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'signup', component: SignupComponent

  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: "about", component: AboutComponent
  },
  {
    path: "contactUs", component: ContactUsComponent
  },

  //USER
  {
    path: 'purchase', component: PurchaseComponent

  },

  // ADMIN
  {
    path: 'dashboard', component: DashboardComponent

  },
  {
    path: "products", component: ProductsComponent, canActivate: [RoleGuard]
  },
  {
    path: "productList", component: ProductListComponent, canActivate: [RoleGuard],
    resolve: { products: ProductListResolver }
  },
  {
    path: "productupdate/:id", component: ProductUpdateComponent, canActivate: [RoleGuard]
  },
  {
    path: "topProducts", component: TopProductsComponent, canActivate: [RoleGuard],
    resolve: { topProducts: TopProductsResolver }
  },
  {
    path: 'inventory', component: InventoryComponent, canActivate: [RoleGuard]
  },
  {
    path: 'billing', component: BillingComponent, canActivate: [RoleGuard]
  },
  {
    path: 'bill-history', component: BillHistoryComponent
  },
  {
    path: 'bill-preview', component: BillPreviewComponent
  },


  // fallback
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
