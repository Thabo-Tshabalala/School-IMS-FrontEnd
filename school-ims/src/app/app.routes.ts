import { Routes } from '@angular/router';
import { LoginComponent } from './user-login/login.component';
import { UserRegistrationComponent } from './user-registration/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component'; // Add the User Dashboard component
import { ProfileComponent } from './user-profile/user-profile.component';
import { AdminAddItemComponent } from './admin/admin.component';
import { InventoryComponent } from './inventory/inventory.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect root to login
  { path: 'login', component: LoginComponent },          // Route for login page
  { path: 'register', component: UserRegistrationComponent },    // Route for registration page
  { path: 'dashboard', component: UserDashboardComponent }, // Route for dashboard page
  {path:'profile',component:ProfileComponent},
  {path:'admin', component:AdminAddItemComponent},
  {path:'inventory', component:InventoryComponent}
];
