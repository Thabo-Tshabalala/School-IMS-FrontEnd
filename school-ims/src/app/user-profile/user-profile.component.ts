import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userId: number | null = null; // Define userId property
  isSubmitting: boolean = false; // Flag to track submission status

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.userID; // Set the userId here
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: user.password, // Ensure password is not null
      });
    }
  }

  onSubmit(): void {
    if (this.isSubmitting) return; // Prevent further submissions if already submitting

    console.log('Form values:', this.profileForm.value);
    console.log('Form validity:', this.profileForm.valid);

    // Log each control's validity
    Object.keys(this.profileForm.controls).forEach(controlName => {
      const control = this.profileForm.get(controlName);
      console.log(`${controlName} valid: ${control?.valid}, errors: ${control?.errors}`);
    });

    if (this.profileForm.valid) {
      this.isSubmitting = true; // Set the flag to indicate submission is in progress

      const updatedUser = {
        ...this.profileForm.value,
        userID: this.userId,
      };

      console.log('Updated User:', updatedUser);

      this.authService.updateUser(updatedUser).subscribe({
        next: (user) => {
          localStorage.setItem('user', JSON.stringify(user));
          console.log('Profile updated successfully:', user);
          alert('Update successful!');
          this.isSubmitting = false; // Reset the flag on success
        },
        error: (err) => {
          console.error('Update failed:', err);
          this.isSubmitting = false; // Reset the flag on error
        },
      });
    } else {
      console.error('Form is invalid:', this.profileForm.errors);
    }
  }

  onLogout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
