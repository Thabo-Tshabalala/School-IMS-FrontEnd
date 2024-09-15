import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // Import router components if needed

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  onSubmit(): void {
    if (this.username && this.password) {
      // Add actual login logic here, e.g., service call for authentication
      console.log('Username:', this.username);
      console.log('Password:', this.password);

      // On successful login, navigate to the dashboard
      this.router.navigate(['/dashboard']);
    }
    this.router.navigate(['/dashboard']);
  }

  onSignUp(): void {
    // Navigate to the registration page
    this.router.navigate(['/register']);
  }
}
