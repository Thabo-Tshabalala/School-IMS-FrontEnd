import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { CommonModule } from '@angular/common'; 
import { NavigationComponent } from '../navigation/navigation.component'; 
import { IconDefinition, faBook, faShoppingCart, faTriangleExclamation, faChartBar, faClipboard } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
import { OrderService } from '../services/orders.service'; 
import { User } from '../models/user.model';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    NavigationComponent,
    MatCardModule,
    MatMenuModule,
    FontAwesomeModule
  ]
})
export class UserDashboardComponent implements OnInit {
  totalItems = 1250;
  lowStockItems = 15;
  recentOrders: Order[] = []; 
  outOfStockItems = ['Notebooks', 'Pencils'];
  requests: Order[] = []; 
  
  // New properties for order counts
  approvedOrdersCount = 0;
  declinedOrdersCount = 0;
  pendingOrdersCount = 0;

  faBook: IconDefinition = faBook;
  faShoppingCart: IconDefinition = faShoppingCart;
  faTriangleExclamation: IconDefinition = faTriangleExclamation;
  faChartBar: IconDefinition = faChartBar;
  faClipboard: IconDefinition = faClipboard;

  constructor(private ordersService: OrderService) {} 

  ngOnInit(): void {
    this.fetchOrdersForUser(); 
  }

  private fetchOrdersForUser(): void {
    this.getUserFromLocalDb().then((user: User | null) => {
      if (user) {
        const userID = user.userID;

        if (userID) {
          this.ordersService.getOrdersByUserId(userID).subscribe(
            (orders: Order[]) => {
              this.recentOrders = orders.filter(order => order.user?.userID !== undefined);
              this.calculateOrderCounts(this.recentOrders); // Calculate counts after fetching orders
            },
            (error) => {
              console.error('Error fetching orders:', error);
            }
          );
        }
      } else {
        console.error('User not found in local database');
      }
    }).catch(err => {
      console.error('Error retrieving user from local database:', err);
    });
  }

  private calculateOrderCounts(orders: Order[]): void {
    this.approvedOrdersCount = orders.filter(order => order.status === 'approved').length;
    this.declinedOrdersCount = orders.filter(order => order.status === 'declined').length;
    this.pendingOrdersCount = orders.filter(order => order.status === 'pending').length;
  }

  private getUserFromLocalDb(): Promise<User | null> {
    return new Promise((resolve) => {
      const userJson = localStorage.getItem('user');
      resolve(userJson ? JSON.parse(userJson) : null);
    });
  }
}
