import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Import Angular Material modules
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule for request button

import { AppComponent } from './app.component';
import { LoginComponent } from './user-login/login.component';
import { InventoryComponent } from './inventory/inventory.component'; // Import the InventoryComponent
import { ProductService } from './services/product.service';

// Import routes
import { routes } from './app.routes';

@NgModule({
  declarations: [
    // AppComponent,
    // LoginComponent,
    // InventoryComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    
    // Add Angular Material modules here
    MatCardModule,  // Import MatCardModule
    MatButtonModule // Import MatButtonModule for the request button
  ],
  providers: [ProductService],
  // bootstrap: [AppComponent]
})
export class AppModule { }
