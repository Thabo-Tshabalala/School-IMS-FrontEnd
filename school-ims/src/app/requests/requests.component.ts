import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/orders.service';
import { Request } from '../models/request.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '../navigation/navigation.component';
import { forkJoin } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; // Import ConfirmDialogComponent

@Component({
  standalone: true,
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  imports: [CommonModule, FormsModule, NavigationComponent, RouterLink, RouterLinkActive, RouterOutlet]
})
export class RequestsComponent implements OnInit {
  requests: Request[] = [];
  filteredRequests: Request[] = [];
  newRequest: Request = {
    requestId: null,
    product: null,
    user: null,
    quantity: 0,
    status: 'Pending',
  };

  isLoading = true;
  isOrdering = false;
  user: User | null = null;
  products: Product[] = [];

  constructor(
    private requestService: RequestService,
    private productService: ProductService,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialog // Inject MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadRequests();
  }

  loadUser(): void {
    this.user = this.userService.getUserLocal();
    if (!this.user) {
      console.error('No user found in local storage');
    }
  }

  loadRequests(): void {
    this.isLoading = true;
    this.requestService.getRequests().subscribe(
      (data: Request[]) => {
        this.requests = data.filter(request => request.user?.email === this.user?.email);
        this.filteredRequests = this.requests;
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
      .filter(request => request.requestId != null)
      .map(request => 
        this.productService.getProduct(request.product?.productId as number).pipe(
          map((product: Product) => {
            request.quantity = product.stockQuantity ?? 0;
            this.products.push(product);
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


openConfirmDialog(totalQuantity: number): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px',
    data: {
      title: 'Confirm Order',  
      message: `You are about to order ${totalQuantity} products. Confirm or cancel?`,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      confirmButtonColor: 'primary', 
    },
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.createOrder();
    } else {
      console.log('Order canceled');
    }
  });
}


  createRequest(): void {
    const totalQuantity = this.requests.reduce((total, request) => total + (request.quantity || 0), 0);
    

    this.openConfirmDialog(totalQuantity);
  }

  createOrder(): void {
    this.isLoading = true;
    this.isOrdering = true;
  
    const outOfStockRequests = this.requests.filter((request) => {
      const productInStock = this.products.find(product => product.productId === request.requestId);
      return productInStock && request.quantity > productInStock.stockQuantity!;
    });
  
    if (outOfStockRequests.length > 0) {
      alert('Some requested items exceed available stock. Please adjust your order.');
      this.isLoading = false;
      this.isOrdering = false;
      return;
    }
  
    const updateRequestsObservables = this.requests.map((request) => {
      const requestToUpdate = { ...request, user: this.user };
  
      return this.requestService.updateRequest(requestToUpdate).pipe(
        tap((updatedRequest: Request) => {
          this.removeRequest(updatedRequest.requestId);
        })
      );
    });
  
    forkJoin(updateRequestsObservables).subscribe(
      () => {
        const order: Order = {
          orderDate: new Date().toISOString().split('T')[0],
          user: this.user,
          status: 'pending',
          quantity: this.requests.reduce((total, request) => total + (request.quantity || 0), 0),
          product: this.products.length > 0 ? this.products[0] : null,
        };
  
        this.orderService.createOrder(order).subscribe(
          (newOrder) => {
            alert('Order created successfully!');
            this.router.navigate(['/orders']); 
          },
          (error) => {
            console.error('Error creating order', error);
            alert('There was an error creating the order. Please check the console for more details.');
          }
        );
      },
      (error) => {
        console.error('Error updating requests', error);
        alert('There was an error updating the requests. Please check the console for more details.');
      },
      () => {
        this.isLoading = false;
        this.isOrdering = false;
      }
    );
  }
  
  removeRequest(requestId: number | null): void {
    if (requestId) {
      this.requestService.deleteRequest(requestId).subscribe({
        next: (success) => {
          if (success) {
            this.requests = this.requests.filter(request => request.requestId !== requestId);
          }
        },
        error: (error) => {
          console.error('Error deleting request:', error);
        }
      });
    }
  }
}
