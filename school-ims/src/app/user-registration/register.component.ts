import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service'; // Adjust the import path as needed
import { User } from '../models/user.model'; // Adjust the import path as needed
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class UserRegistrationComponent {
  form = new FormGroup({
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    phone: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(12)] }),
    confirmPassword: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(12)] }),
  });

  constructor(private router: Router, private userService: UserService) {}

  isSubmitting = false;

  onSubmit() {
    if (this.form.invalid || this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;

    const user: User = {
      userID: null,
      firstName: this.form.value.firstName!,
      lastName: this.form.value.lastName!,
      email: this.form.value.email!,
      password: this.form.value.password!,
      phoneNumber: this.form.value.phone!, 
    };

    const confirmPassword = this.form.value.confirmPassword!;

    // Check if passwords match
    if (user.password !== confirmPassword) {
      alert('Passwords do not match!');
      this.isSubmitting = false; // Reset flag
      return;
    }

    // Proceed with user creation
    this.userService.createUser(user).subscribe({
      next: (createdUser: User) => {
        console.log('User registered successfully', createdUser);
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 409) { // Assuming 409 for duplicate email
          alert('Email already exists');
        } else {
          alert('Registration failed. Please try again.');
        }
        this.isSubmitting = false; // Reset flag on error
      }
    });
  }
}
