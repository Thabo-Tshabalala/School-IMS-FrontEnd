import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule] // Include FormsModule here
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit(): void {
    if (this.username && this.password) {
      console.log('Username:', this.username);
      console.log('Password:', this.password);
    }
  }
}
