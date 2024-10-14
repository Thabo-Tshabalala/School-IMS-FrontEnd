// admin-requests.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { OrderService } from '../services/orders.service'; // Adjust the import path as necessary
import { Order } from '../models/order.model'; // Adjust the import path as necessary

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent implements OnInit {
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  requests: Order[] = []; 

  constructor(private location: Location, private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders(); 
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.requests = orders; 
      },
      error: (err) => {
        console.error('Failed to load orders:', err);
      }
    });
  }

  get filteredRequests(): Order[] {
    return this.requests.filter(req =>
      req.orderDate.toLowerCase().includes(this.searchTerm.toLowerCase())
      // Uncomment and modify the following line if you want to filter by imageUrl as well
      // || (req.items.length > 0 && req.items[0].imageUrl.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  handleApprove(id: number): void {
    this.requests = this.requests.map(req =>
      req.orderId === id ? { ...req, status: 'approved' } : req
    );
  }

  handleDecline(id: number): void {
    this.requests = this.requests.map(req =>
      req.orderId === id ? { ...req, status: 'declined' } : req
    );
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
  }

  get paginatedRequests(): Order[] {
    const indexOfLastItem = this.currentPage * this.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - this.itemsPerPage;
    return this.filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  }

  get pageCount(): number {
    return Math.ceil(this.filteredRequests.length / this.itemsPerPage);
  }

  goBack(): void {
    this.location.back();
  }
}
