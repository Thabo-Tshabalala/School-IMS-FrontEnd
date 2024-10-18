import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngClass and ngIf

@Component({
  standalone: true, // Mark as standalone component
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.css'],
  imports: [CommonModule], // Add CommonModule to imports
})
export class NotificationIconComponent {
  @Input() count: number = 0; // Default count to 0
}
