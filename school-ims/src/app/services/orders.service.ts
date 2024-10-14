// order.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model'; 

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/orders';

  // Create Order
  createOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(`${this.apiUrl}/create`, order);
  }
  
  getOrdersByUserId(userId: string): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.apiUrl}/getByUserId/${userId}`); 
    
  }
  

    // Get All Orders
    getAllOrders(): Observable<Order[]> {
      return this.httpClient.get<Order[]>(`${this.apiUrl}/getAll`);
    }

  //Todo admin-ord
}
