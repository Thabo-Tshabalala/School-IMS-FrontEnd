import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/orders.service'; 
import { Order } from '../models/order.model'; 
import { User } from '../models/user.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  standalone: true,
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [NavigationComponent, CommonModule],
})
export class OrdersComponent implements OnInit {
  requests: Order[] = []; 
  filter: 'All' | 'pending' | 'approved' | 'declined' = 'All';
  totalAmountSpent: number = 0; 
  
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
              this.calculateTotalAmountSpent();  
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
    this.filter = selectElement.value as 'All' | 'pending' | 'approved' | 'declined'; 
  }

  calculateTotalAmountSpent(): void {
    this.totalAmountSpent = this.requests.reduce((sum, order) => sum + (order.product?.price || 0), 0);
  }

  generatePDF(): void {
    setTimeout(() => {
      const pdf = new jsPDF();
      const orderElement = document.getElementById('orderDetails');
      
      if (orderElement) {
        html2canvas(orderElement).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 190; 
          const pageHeight = pdf.internal.pageSize.height;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let position = 0;
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          position += imgHeight;
          pdf.setFontSize(14);
          pdf.text('Potential Cost: R ' + this.totalAmountSpent.toFixed(2), 10, position + 10);

          pdf.save('order-details.pdf');
        }).catch(error => {
          console.error('Error generating PDF:', error);
        });
      } else {
        console.error('Order details element not found for PDF generation');
      }
    }, 100);
  }
}
