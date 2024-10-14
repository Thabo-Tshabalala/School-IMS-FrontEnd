import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/user'; 
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    console.log(`Login called with email: ${email}`); 
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(user => {
        console.log('Login successful, user data:', user);
        this.setCurrentUser(user);
      })
    );
  }

  // Method to update user profile
  updateUser(user: User): Observable<User> {
    console.log('Update user called with:', user); 
    return this.http.put<User>(`${this.apiUrl}/update`, user).pipe(
      tap(updatedUser => {
        console.log('User updated successfully, new data:', updatedUser);
      })
    );
  }


  setCurrentUser(user: User): void {
    console.log('Setting current user:', user); 
    this.currentUser = user;
  }

  // Method to get the current user
  getCurrentUser(): User | null {
    console.log('Getting current user'); 
    return this.currentUser;
  }

  
  getCurrentUserEmail(): string | undefined {
    console.log('Getting current user email'); 
    return this.currentUser?.email!;
  }
}
