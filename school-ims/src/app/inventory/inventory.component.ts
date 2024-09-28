import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router'; // Import Router for navigation
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component'; 

@Component({
  standalone: true,
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  imports: [CommonModule, MatCardModule, NavigationComponent]
})
export class InventoryComponent implements OnInit {
  products: Product[] = []; // Initialize the products array

  constructor(private productService: ProductService, private router: Router) {} // Inject the ProductService and Router

  ngOnInit(): void {
    this.loadProducts(); // Fetch products on component initialization
  }

  // Fetch products from the service
  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data; // Set products directly without additional properties
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Request product logic
  requestProduct(product: Product): void {
    alert(`You have requested ${product.name}`); // Notify user of request
    // Navigate to the requests screen (assuming a route is set for requests)
    this.router.navigate(['/requests']);
  }
}
