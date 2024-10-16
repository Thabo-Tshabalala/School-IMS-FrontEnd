import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/orders.service'; 
import { Order } from '../models/order.model'; 
import { User } from '../models/user.model';

@Component({
  standalone: true,
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [NavigationComponent, CommonModule],
})
export class OrdersComponent implements OnInit {
  requests: Order[] = []; 
  filter: 'All' | 'Pending' | 'Approved' | 'Rejected' = 'All';
  
  statusColors: { [key: string]: string } = {
    approved: 'badge-approved',
    declined: 'badge-rejected',
    pending: 'badge-pending',
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrdersForUser(); 
  }

  fetchOrdersForUser(): void {
    this.getUserFromLocalDb().then((user: User | null) => {
      if (user) {
        const userID = user.userID;

        if (userID) {
          this.orderService.getOrdersByUserId(userID).subscribe(
            (orders: Order[]) => {
              this.requests = orders.filter(order => order.user?.userID !== undefined);
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

  getUserFromLocalDb(): Promise<User | null> {
    return new Promise((resolve) => {
      const userJson = localStorage.getItem('user');
      resolve(userJson ? JSON.parse(userJson) : null);
    });
  }

  get filteredRequests(): Order[] {
    return this.filter === 'All' 
      ? this.requests 
      : this.requests.filter(request => request.status === this.filter);
  }

  onFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; 
    this.filter = selectElement.value as 'All' | 'Pending' | 'Approved' | 'Rejected'; 
  }
}
