import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router'; 
import { NotificationIconComponent } from '../notification-icon/notification-icon.component';
import { RequestService } from '../services/request.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NotificationIconComponent],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  notificationCount: number = 0; 
  private notificationSubscription: Subscription | undefined;

  constructor(private notificationService: RequestService) {} 

  ngOnInit(): void {
    this.fetchNotificationCount(); 
    this.notificationSubscription = interval(5000).subscribe(() => {
      this.fetchNotificationCount();
    });
  }

  fetchNotificationCount(): void {
    this.notificationService.getNotificationCount().subscribe({
      next: (count) => {
        this.notificationCount = count; 
      },
      error: (err) => {
        console.error('Error fetching notification count:', err); 
      }
    });
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe(); 
    }
  }
}
