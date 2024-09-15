import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './user-login/login.component';
import { RegisterComponent } from './user-registration/register.component';  
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
    RouterModule.forRoot(routes) ,// Set up routing
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { }
