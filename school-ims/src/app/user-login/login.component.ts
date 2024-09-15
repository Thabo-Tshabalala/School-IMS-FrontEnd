import { Component } from '@angular/core';
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

  onSubmit(): void {
    if (this.username && this.password) {
      //  login logic
      console.log('Username:', this.username);
      console.log('Password:', this.password);
  
    }
  }
}
