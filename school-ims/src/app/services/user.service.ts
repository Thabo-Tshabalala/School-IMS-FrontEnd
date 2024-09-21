import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Create a new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/create`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Get user by email
  getUserByEmail(email: string, password: string): Observable<User> {
    const body = { email, password }; // Create an object to send in the request
    return this.http.post<User>(`${this.apiUrl}/login`, body); // Use POST for security
  }
  
  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }
    // Get user by email
    getSpecificUserByEmail(email: string): Observable<User> {
      return this.http.get<User>(`${this.apiUrl}/check/${email}`);
    }

  // Update an existing user
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Delete a user
  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/delete/${userId}`);
  }
}
