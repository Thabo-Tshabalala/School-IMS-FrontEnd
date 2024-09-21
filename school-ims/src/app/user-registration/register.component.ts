import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service'; // Adjust the import path as needed
import { User } from '../models/user.model'; // Adjust the import path as needed
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, HttpClientModule], // Include HttpClientModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class UserRegistrationComponent {
  customerEmail: string | undefined | null;

  form = new FormGroup({
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    phone: new FormControl('', { validators: [Validators.required] }), // New phone control
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(12)] }),
    confirmPassword: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(12)] }),
  });

  constructor(private router: Router, private httpClient: HttpClient, private userService: UserService) {}


  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      userID: null,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email!,
      password: this.form.value.password,
      phoneNumber: this.form.value.phone, 
    };

    const confirmPassword = this.form.value.confirmPassword;

   
    if (user.password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const email = this.form.value.email; 

    if (email) { 
      this.userService.getUserByEmail(email).subscribe({
        next: (existingUser: User) => {
          if (existingUser) {
            alert('Email already taken');
            this.customerEmail = existingUser.email;
            return;
          } else {
            this.userService.createUser(user).subscribe({
              next: (createdUser: User) => {
                console.log('User registered successfully', createdUser);
                alert('Registration successful!');
                this.router.navigate(['/login']);
              },
              error: (error: HttpErrorResponse) => {
                alert('Something went wrong: ' + error.message);
              }
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          alert('Error checking email: ' + error.message);
        }
      });
    } else {
      alert('Email is required'); 
    }
  }
}
