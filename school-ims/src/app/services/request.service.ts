import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Request } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/requests'; 

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('RequestService error:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  // Create
  createRequest(request: Request): Observable<Request> {
    return this.httpClient.post<Request>(`${this.apiUrl}/create`, request).pipe(
      catchError(this.handleError) 
    );
  }

  // Read Request by ID
  getRequest(id: number): Observable<Request> {
    return this.httpClient.get<Request>(`${this.apiUrl}/read/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Read All Requests
  getRequests(): Observable<Request[]> {
    return this.httpClient.get<Request[]>(`${this.apiUrl}/getAll`).pipe(
      catchError(this.handleError) 
    );
  }

  // Update Request
  updateRequest(request: Request): Observable<Request> {
    return this.httpClient.put<Request>(`${this.apiUrl}/update`, request).pipe(
      catchError(this.handleError)
    );
  }

  // Delete Request
  deleteRequest(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.apiUrl}/delete/${id}`).pipe(
      catchError(this.handleError) 
    );
  }
}
