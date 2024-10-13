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

  //To do , add 1 more api to view orders, need to think more abou this
}
