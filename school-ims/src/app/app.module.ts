import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


// Import Angular Material modules
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { LoginComponent } from './user-login/login.component';
import { InventoryComponent } from './inventory/inventory.component'; 
import { RequestsComponent } from './requests/requests.component'; 
import { ProductService } from './services/product.service';
import { RequestService } from './services/request.service'; 
import { AdminRequestsComponent } from './admin-requests/admin-requests.component'; // Update the path as necessary

// Import routes
import { routes } from './app.routes';

@NgModule({
  declarations: [
    // AppComponent,
    // LoginComponent,
    // InventoryComponent,
    // RequestsComponent //
    
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
  
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatCardModule,  
    MatButtonModule 
  ],
  providers: [ProductService, RequestService], 
  // bootstrap: [AppComponent]
})
export class AppModule { }
