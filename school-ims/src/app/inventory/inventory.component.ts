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
import { UserService } from '../services/user.service'; 
import { User } from '../models/user.model'; 
import { Subscription } from 'rxjs'; 

@Component({
  standalone: true,
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  imports: [CommonModule, FormsModule, NavigationComponent, MatCardModule]
})
export class InventoryComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  currentUser: User | null = null; 
  private userSubscription: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private router: Router,
    private requestService: RequestService,
    private userService: UserService 
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.getCurrentUser(); 
  }

  loadProducts(): void {
    this.isLoading = true; 
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data; 
      },
      (error) => {
        console.error('Error loading products', error);
        alert('There was an error loading products. Please try again later.');
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  getCurrentUser(): void {
    const email = this.getUserEmail(); 
    if (!email) {
      console.error('No user email found in local storage');
      alert('Unable to fetch user email. Please log in again.');
      return;
    }
    
    this.userSubscription = this.userService.getUser(email).subscribe(
      (user: User) => {
        this.currentUser = user;
        console.log('Current user retrieved:', this.currentUser); 
      },
      (error) => {
        console.error('Error fetching user', error);
        alert('Unable to fetch user. Please try again later.');
      }
    );
  }

  requestProduct(product: Product): void {
    const newRequest: Request = {
      requestId: null,
      user: this.currentUser, 
      product: product,
      quantity: 1, 
      status: 'Pending',
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
          alert('Error: Unable to save the request. Please try again.');
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private getUserEmail(): string | undefined {
    const userJson = localStorage.getItem('user'); 
    if (userJson) {
      const user: User = JSON.parse(userJson);
      return user.email!;
    }
    return undefined; 
  }
}
