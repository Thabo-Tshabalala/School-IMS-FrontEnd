import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})


export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Load user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedUser = this.profileForm.value;
      this.authService.updateUser(updatedUser).subscribe({
        next: (user) => {
          // Optionally update localStorage or show a success message
          localStorage.setItem('user', JSON.stringify(user));
          console.log('Profile updated successfully:', user);
        },
        error: () => {
          console.error('Update failed');
          // Handle the error case
        },
      });
    }
  }
  onLogout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

