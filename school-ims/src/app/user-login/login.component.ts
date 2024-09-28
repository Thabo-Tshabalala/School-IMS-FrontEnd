import { Component, ViewChild, inject, DestroyRef } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { UserService } from '../services/user.service';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model'; // Import the User model if necessary

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive, CommonModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('form') form!: NgForm;

  email = '';
  password = '';
  empty = false;

  private destroyRef = inject(DestroyRef);
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private userService: UserService) {}

  onLogin() {
    if (this.form.invalid) {
      this.empty = true; 
      console.log('Form is invalid');
      return;
    }

    this.email = this.form.form.value.email;
    this.password = this.form.form.value.password;

    console.log('Attempting login with:', { email: this.email, password: this.password });

    const authSubscription = this.userService.authenticate(this.email, this.password).pipe(
      tap(userType => console.log('Login verification response:', userType))
    ).subscribe({
      next: (userType: string) => {
        this.handleLoginResponse(userType);
      },
      error: (error: HttpErrorResponse) => {
        alert('Incorrect details');
        console.error('Login error:', error);
      }
    });

    this.subscription.add(authSubscription);
  }

  private handleLoginResponse(userType: string) {
    switch (userType) {
      case 'Admin':
        this.router.navigate(['/admin']).then(success => {
          console.log(success ? 'Navigation to /admin successful' : 'Navigation to /admin failed');
        });
        break;

      case 'User':
        // Fetch user details after authentication
        this.userService.getUser(this.email).subscribe({
          next: (user: User) => {
            console.log('User details retrieved:', user); // Debug log
            localStorage.setItem('user', JSON.stringify(user)); // Store user details

            alert('Login successful');
            this.router.navigate(['/dashboard']).then(success => {
              console.log(success ? 'Navigation to /dashboard successful' : 'Navigation to /dashboard failed');
              // Optionally reload the page
              window.location.reload();
            });
          },
          error: (error: HttpErrorResponse) => {
            alert('Failed to retrieve user details');
            console.error('User retrieval error:', error);
          }
        });
        break;

      default:
        alert('Incorrect details');
        break;
    }
  }

  onSignUp(): void {
    this.router.navigate(['/register']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
