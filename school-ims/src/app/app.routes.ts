import { Routes } from '@angular/router';
import { LoginComponent } from './user-login/login.component';
import { RegisterComponent } from './user-registration/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component'; // Add the User Dashboard component

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect root to login
  { path: 'login', component: LoginComponent },          // Route for login page
  { path: 'register', component: RegisterComponent },    // Route for registration page
  { path: 'dashboard', component: UserDashboardComponent } // Route for dashboard page
];
