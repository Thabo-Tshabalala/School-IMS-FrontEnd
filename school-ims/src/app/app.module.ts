import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // For template-driven forms
import { RouterModule } from '@angular/router'; // For routing

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; // Example component
import { NavigationComponent } from './navigation/navigation.component'; // Import the navigation component
import { routes } from './app.routes'; // Import your routes

@NgModule({
  declarations: [
    // AppComponent,
    // LoginComponent,
    // RegisterComponent, // Declare other components
    // NavigationComponent // Declare the NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Include FormsModule for forms
    RouterModule.forRoot(routes) // Configure routing
  ],
  providers: [],
//   bootstrap: [AppComponent] // Bootstrap the root component
})
export class AppModule { }
