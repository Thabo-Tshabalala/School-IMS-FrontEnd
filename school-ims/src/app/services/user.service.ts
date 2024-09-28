import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';
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
     public getUser(email: string | undefined | null): Observable<User> {
      return this.http.get<User>(`http://localhost:8080/user/login/${email}`);
  }

  
  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }
    // Get user by email
    getSpecificUserByEmail(email: string): Observable<User> {
      return this.http.get<User>(`http://localhost:8080/api/users/${email}`);

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

      // Admin Methods
      public verifyAdmin(email: string, password: string): Observable<boolean> {
        return this.http.get<boolean>(`http://localhost:8080/admin/login/${email}/${password}`);
    }

   
    public getAdmin(email: string): Observable<any> {
        return this.http.get<User>(`http://localhost:8080/admin/login/${email}`);
    }

   
    public authenticate(email: string, password: string): Observable<string> {
        let params = new HttpParams()
            .set('email', email)
            .set('password', password);

        return this.http.post<string>(`http://localhost:8080/auth/login`, null, {
            params: params,
            responseType: 'text' as 'json' // Pass as json else error
        });
    }

        // Get customer from local storage
        public getUserLocal(): User | null {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
              // Parse the JSON string to a Customer object
              const user: User = JSON.parse(storedUser);
              return user;
          }
          return null;
      }
}
