import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppComponent } from './app.component';
import { LoginComponent } from './user-login/login.component';
// import { RegisterComponent } from './user-registration/register.component';  
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// Import routes
import { routes } from './app.routes';

@NgModule({
  declarations: [
    // AppComponent,
    // LoginComponent,
    // RegisterComponent // Declare your components here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [],
  // bootstrap: [AppComponent] // Make sure to bootstrap your main component
})
export class AppModule { }
