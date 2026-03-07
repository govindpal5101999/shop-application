import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductListComponent } from './product-list/product-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from './filter.pipe';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { TopProductsComponent } from './top-products/top-products.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FullScreenLoaderComponent } from './shared/full-screen-loader/full-screen-loader.component';
import { LoaderInterceptor } from './core/loader.interceptor';
import { InventoryComponent } from './inventory/inventory.component';
import { BillingComponent } from './billing/billing.component';
import { BillHistoryComponent } from './bill-history/bill-history.component';
import { BillPreviewComponent } from './billing/bill-preview/bill-preview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './core/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    AboutComponent,
    ProductListComponent,
    FilterPipe,
    ProductUpdateComponent,
    TopProductsComponent,
    ContactUsComponent,
    NavBarComponent,
    FullScreenLoaderComponent,
    InventoryComponent,
    BillingComponent,
    BillHistoryComponent,
    BillPreviewComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    PurchaseComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
