import { Routes } from '@angular/router';
import { LoginComponent } from './user-login/login.component';
import { UserRegistrationComponent } from './user-registration/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component'; 
import { ProfileComponent } from './user-profile/user-profile.component';
import { AdminAddItemComponent } from './admin/admin.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RequestsComponent } from './requests/requests.component';
import { OrdersComponent } from './orders/orders.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },          
  { path: 'register', component: UserRegistrationComponent },    
  { path: 'dashboard', component: UserDashboardComponent }, 
  {path:'profile',component:ProfileComponent},
  {path:'admin', component:AdminAddItemComponent},
  {path:'inventory', component:InventoryComponent},
  {path:'requests', component:RequestsComponent},
  {path: 'orders', component :OrdersComponent}
];
