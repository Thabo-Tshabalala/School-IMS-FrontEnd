import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { CommonModule } from '@angular/common'; 
import { NavigationComponent } from '../navigation/navigation.component'; 
import { IconDefinition, faBook, faShoppingCart, faTriangleExclamation, faChartBar, faClipboard } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
import { OrderService } from '../services/orders.service'; 

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
  recentOrders: any[] = []; 
  outOfStockItems = ['Notebooks', 'Pencils'];

  faBook: IconDefinition = faBook;
  faShoppingCart: IconDefinition = faShoppingCart;
  faTriangleExclamation: IconDefinition = faTriangleExclamation;
  faChartBar: IconDefinition = faChartBar;
  faClipboard: IconDefinition = faClipboard;

  constructor(private ordersService: OrderService) {} 

  ngOnInit(): void {
    this.fetchRecentOrders(); 
  }

  fetchRecentOrders(): void {// This is also a todo ,need to fetch local user
    this.ordersService.getOrdersByUserId("2").subscribe(
      (orders) => {
        this.recentOrders = orders; 
      },
      (error) => {
        console.error('Error fetching recent orders:', error);
      }
    );
  }
}
