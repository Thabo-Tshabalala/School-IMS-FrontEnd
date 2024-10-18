import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user'; 

  constructor(private http: HttpClient) { }

  // Create a new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/create`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  public getUser(email: string | undefined | null): Observable<User> {
    if (!email) {
      // Return an observable that emits an error
      return new Observable<User>((observer) => {
        observer.error(new Error("Email must be provided to get a user"));
      });
    }
    
    // Proceed with the HTTP request if the email is valid
    return this.http.get<User>(`${this.apiUrl}/login/${email}`);
  }
  

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/delete/${userId}`);
  }

  public verifyAdmin(email: string, password: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/admin/login/${email}/${password}`);
  }

  public getAdmin(email: string): Observable<any> {
    return this.http.get<User>(`http://localhost:8080/admin/login/${email}`);
  }

  public authenticate(email: string, password: string): Observable<string> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post<string>(`http://localhost:8080/auth/login`, null, {
      params: params,
      responseType: 'text' as 'json' 
    });
  }

  public getUserLocal(): User | null {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      return user;
    }
    return null;
  }


  
}
