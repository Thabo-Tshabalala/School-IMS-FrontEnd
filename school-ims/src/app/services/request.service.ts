import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../models/request.model'; // Adjust this path as needed

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/requests'; // Adjust the URL to match your API endpoint

  // Create
  createRequest(request: Request): Observable<Request> {
    return this.httpClient.post<Request>(`${this.apiUrl}/create`, request);
  }

  // Read Request by ID
  getRequest(id: number): Observable<Request> {
    return this.httpClient.get<Request>(`${this.apiUrl}/read/${id}`);
  }

  // Read All Requests
  getRequests(): Observable<Request[]> {
    return this.httpClient.get<Request[]>(`${this.apiUrl}/getAll`);
  }

  // Update Request
  updateRequest(request: Request): Observable<Request> {
    return this.httpClient.put<Request>(`${this.apiUrl}/update`, request);
  }

  // Delete Request
  deleteRequest(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.apiUrl}/delete/${id}`);
  }
}
