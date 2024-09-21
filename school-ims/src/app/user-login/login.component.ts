import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

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
     
      console.log('Username:', this.username);
      console.log('Password:', this.password);

   
      this.router.navigate(['/dashboard']);
    }
    this.router.navigate(['/dashboard']);
  }

  onSignUp(): void {
    // Navigate to the registration page
    this.router.navigate(['/register']);
  }
}
