import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NavigationComponent } from '../navigation/navigation.component'; 

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, NavigationComponent]
})
export class UserDashboardComponent implements OnInit {
  totalItems: number = 0;
  lowStockItems: number = 0;
  outOfStockItems: string[] = [];
  recentOrders: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Mock data - I need data from a service here.
    this.totalItems = 150; // Total number of inventory items
    this.lowStockItems = 5; // Number of items low on stock
    this.outOfStockItems = ['Pens', 'Notebooks']; // List of out-of-stock items
    this.recentOrders = [
      { id: 1, status: 'Pending' },
      { id: 2, status: 'Shipped' }
    ]; // List of recent orders
  }
}
