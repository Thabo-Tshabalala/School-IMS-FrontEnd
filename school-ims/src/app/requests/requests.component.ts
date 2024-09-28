import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { ProductService } from '../services/product.service';
import { Request } from '../models/request.model';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, map } from 'rxjs';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  standalone: true,
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  imports: [CommonModule, FormsModule, NavigationComponent]
})
export class RequestsComponent implements OnInit {
  requests: Request[] = [];
  newRequest: Request = { requestId: null, productId: 0, quantity: 0, status: 'Pending', imageUrl: null, productName: null }; 
  isLoading = true;

  constructor(
    private requestService: RequestService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.isLoading = true;
    this.requestService.getRequests().subscribe(
      (data: Request[]) => {
        this.requests = data;
        this.loadProductDetails();
      },
      (error) => {
        console.error('Error loading requests', error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  loadProductDetails(): void {
    const productRequests = this.requests
      .filter(request => request.productId != null) 
      .map(request => 
        this.productService.getProduct(request.productId as number).pipe(
          map((product: Product) => {
            request.productName = product.name;
            request.imageUrl = product.imageUrl;
          })
        )
      );
  
    
    if (productRequests.length > 0) {
      forkJoin(productRequests).subscribe(() => {
    
      });
    } else {
      console.warn('No valid product requests to load details for.');
    }
  }
  createRequest(): void {
    this.isLoading = true;

  
    this.newRequest.requestId = null;

    this.requestService.createRequest(this.newRequest).subscribe(
        (createdRequest: Request) => {
      
            this.requests.push(createdRequest);
        
            this.newRequest = { requestId: null, productId: 0, quantity: 0, status: 'Pending', imageUrl: null, productName: null };
        },
        (error) => {
            console.error('Error creating request', error);
            alert('There was an error creating the request. Please check the console for more details.'); 
        },
        () => {
            this.isLoading = false;
        }
    );
}



}
