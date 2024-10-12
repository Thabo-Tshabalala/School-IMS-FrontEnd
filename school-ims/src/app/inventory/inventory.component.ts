import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NavigationComponent } from '../navigation/navigation.component';
import { RequestService } from '../services/request.service'; 
import { Request } from '../models/request.model'; 
import { User } from '../models/user.model';
import { UserService } from '../services/user.service'; 

@Component({
  standalone: true,
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  imports: [CommonModule, FormsModule, NavigationComponent, MatCardModule]
})
export class InventoryComponent implements OnInit {
  products: Product[] = [];
  user: User | null = null; 
  isLoading = true;

  constructor(
    private productService: ProductService,
    private router: Router,
    private requestService: RequestService,
    private userService: UserService 
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadUser();
  }

  loadProducts(): void {
    this.isLoading = true; 
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data; 
      },
      (error) => {
        console.error('Error loading products', error);
        alert('There was an error loading products.');
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  loadUser(): void {
    const storedUser = this.userService.getUserLocal();
    
    if (storedUser) {

      this.user = storedUser;
    } else {
      console.error('No user found in local storage');
      return; 
    }
  
    
    this.userService.getUser(this.user.email).subscribe(
      (user) => {
        this.user = user; 
      },
      (error) => {
        console.error('Error loading user', error);
      }
    );
  }
  
  requestProduct(product: Product): void {
    if (!this.user) {
      alert('Please log in to request a product.');
      return;
    }

    const newRequest: Request = {
      requestId: null,
      product: product,
      user: this.user,
      quantity: 0,
      status: 'Pending',
      productName: product.name,
      imageUrl: product.imageUrl
    };

    console.log('Request Payload:', newRequest);

    this.requestService.createRequest(newRequest).subscribe(
      () => {
        console.log('Request saved successfully:', newRequest);
        alert(`Product "${product.name}" has been requested successfully!`);
        this.router.navigate(['/requests']);
      },
      (error) => {
        if (error.status === 400 && error.error === 'Error: Product has already been requested.') {
          alert(`Product "${product.name}" has already been requested.`);
        } else {
          console.error('Error saving request', error);
          alert('Error: Product could not be requested.');
        }
      }
    );
  }
}
