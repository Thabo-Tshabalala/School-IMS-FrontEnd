import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';

interface InventoryRequest {
  id: number;
  image: string;
  quantity: number;
  status: string;
  date: string;
}

@Component({
  standalone: true,
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [NavigationComponent, CommonModule],
})
export class OrdersComponent implements OnInit {
  requests: InventoryRequest[] = [];
  filter: string = 'All';

  statusColors: { [key: string]: string } = {
    Pending: 'bg-yellow-500',
    Approved: 'bg-green-500',
    Rejected: 'bg-red-500',
  };

  constructor() {
    this.requests = [
      { id: 1, image: 'https://www.moollafurniture.co.za/cdn/shop/products/Steel_Frame_Chair-_Blue.jpg?v=1618525445', quantity: 2, status: 'Approved', date: '2023-05-15' },
      { id: 2, image: 'https://officegroup.co.za/wp-content/uploads/2018/05/school-desk-double.jpg', quantity: 1, status: 'Pending', date: '2023-05-18' },
      { id: 3, image: 'https://www.moollafurniture.co.za/cdn/shop/products/Steel_Frame_Chair-_Blue.jpg?v=1618525445', quantity: 3, status: 'Rejected', date: '2023-05-20' },
      { id: 4, image: 'https://officegroup.co.za/wp-content/uploads/2018/05/school-desk-double.jpg', quantity: 1, status: 'Pending', date: '2023-05-22' },
    ];
  }

  ngOnInit(): void {}

  get filteredRequests(): InventoryRequest[] { 
    return this.filter === 'All' 
      ? this.requests 
      : this.requests.filter(request => request.status === this.filter); 
  }

  onFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; 
    this.filter = selectElement.value; 
  }
}
