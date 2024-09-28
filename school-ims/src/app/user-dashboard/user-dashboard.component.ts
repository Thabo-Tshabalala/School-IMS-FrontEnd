import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { CommonModule } from '@angular/common'; 
import { NavigationComponent } from '../navigation/navigation.component'; 
import { IconDefinition, faBook, faShoppingCart, faTriangleExclamation, faChartBar, faClipboard } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    NavigationComponent,
    MatCardModule,
    MatMenuModule,
    FontAwesomeModule
  ]
})
export class UserDashboardComponent {
  totalItems = 1250;
  lowStockItems = 15;
  recentOrders = [
    { id: 'ORD001', status: 'Delivered', date: '2023-09-15' },
    { id: 'ORD002', status: 'Pending', date: '2023-09-14' },
    { id: 'ORD003', status: 'Processing', date: '2023-09-13' },
  ];
  outOfStockItems = ['Notebooks', 'Pencils'];

  faBook: IconDefinition = faBook;
  faShoppingCart: IconDefinition = faShoppingCart;
  faTriangleExclamation: IconDefinition = faTriangleExclamation;
  faChartBar: IconDefinition = faChartBar;
  faClipboard: IconDefinition = faClipboard;

  // Remove faPackage if it was previously defined
}
