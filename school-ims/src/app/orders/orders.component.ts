import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/orders.service'; 
import { Order } from '../models/order.model'; 
import { User } from '../models/user.model'; // Adjust the import based on your actual User model location

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
  
  statusColors: { [key in Order['status']]: string } = {
    Pending: 'bg-yellow-500',
    Approved: 'bg-green-500',
    Rejected: 'bg-red-500',
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrdersForUser(); 
  }

fetchOrdersForUser(): void {
  this.getUserFromLocalDb().then((user: User | null) => {
      if (user) {
          const userID = user.userID;

          if (userID !== null && userID !== undefined) {
              this.orderService.getOrdersByUserId(userID).subscribe(
                  (orders: Order[]) => {
                      console.log('Fetched Orders:', JSON.stringify(orders, null, 2));
                      this.requests = orders.filter(order => order.user?.userID !== undefined);

                    
                      console.log('Filtered Requests:', JSON.stringify(this.requests, null, 2));
                  },
                  (error) => {
                      console.error('Error fetching orders:', error);
                  }
              );
          } else {
              console.error('User ID is null or undefined');
          }
      } else {
          console.error('User not found in local database');
      }
  }).catch(err => {
      console.error('Error retrieving user from local database:', err);
  });
}



  getUserFromLocalDb(): Promise<User | null> {
    return new Promise((resolve, reject) => {

      const userJson = localStorage.getItem('user');
      if (userJson) {
        resolve(JSON.parse(userJson)); 
      } else {
        resolve(null); 
      }
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
