import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

interface Request {
  id: number;
  productName: string;
  numberOfItems: number;
  requester: string;
  date: string;
  status: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent {
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  requests: Request[] = [
    { id: 1, productName: 'Whiteboard', numberOfItems: 5, requester: 'John Doe', date: '2023-06-01', status: 'pending' },
    { id: 2, productName: 'Projector', numberOfItems: 3, requester: 'Jane Smith', date: '2023-06-02', status: 'approved' },
    { id: 3, productName: 'Laptop', numberOfItems: 10, requester: 'Bob Johnson', date: '2023-06-03', status: 'declined' },
    { id: 4, productName: 'Textbooks', numberOfItems: 7, requester: 'Alice Brown', date: '2023-06-04', status: 'pending' },
    { id: 5, productName: 'Art Supplies', numberOfItems: 8, requester: 'Charlie Davis', date: '2023-06-05', status: 'pending' },
    { id: 6, productName: 'Science Lab Equipment', numberOfItems: 2, requester: 'Eva White', date: '2023-06-06', status: 'pending' },
    { id: 7, productName: 'Gym Equipment', numberOfItems: 15, requester: 'Frank Miller', date: '2023-06-07', status: 'approved' },
    { id: 8, productName: 'Stationery Supplies', numberOfItems: 6, requester: 'Grace Lee', date: '2023-06-08', status: 'pending' },
    { id: 9, productName: 'Desktop Computers', numberOfItems: 4, requester: 'Henry Wilson', date: '2023-06-09', status: 'declined' },
    { id: 10, productName: 'Classroom Chairs', numberOfItems: 12, requester: 'Ivy Chen', date: '2023-06-10', status: 'pending' },
  ];
  

  constructor(private location: Location) {} 

  get filteredRequests(): Request[] {
    return this.requests.filter(req =>
      req.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      req.requester.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  handleApprove(id: number): void {
    this.requests = this.requests.map(req =>
      req.id === id ? { ...req, status: 'approved' } : req
    );
  }

  handleDecline(id: number): void {
    this.requests = this.requests.map(req =>
      req.id === id ? { ...req, status: 'declined' } : req
    );
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
  }

  get paginatedRequests(): Request[] {
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
