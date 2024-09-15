import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Load user data here (e.g., from a service)
    // this.loadUserData();
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      // Handle form submission, e.g., save data to server
      console.log('Profile updated', this.profileForm.value);
    }
  }

  onLogout(): void {
    // Implement logout logic here
    console.log('User logged out');
    this.router.navigate(['/login']); // Navigate to login page
  }
}
