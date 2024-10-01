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

  constructor(
    private productService: ProductService,
    private router: Router,
    private requestService: RequestService 
  ) {}

  ngOnInit(): void {
    this.loadProducts();
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

  requestProduct(product: Product): void {
    const newRequest: Request = {
        requestId: null,
        product: product,
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
            console.error('Error saving request', error);
            alert('There was an error requesting the product. Please try again.');
        }
    );
}

}
