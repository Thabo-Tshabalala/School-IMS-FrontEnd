import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service'; 
import { Product } from '../models/product.model'; 
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterLink,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  productForm!: FormGroup;
  products: Product[] = [];
  isEditMode = false;
  currentProductId: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProducts();
  }

  private initializeForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      error => {
        console.error('Error loading products:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;

      if (this.isEditMode && this.currentProductId !== null) {
        this.productService.updateProduct({ ...product, productId: this.currentProductId }).subscribe(
          (updatedProduct: Product) => {
            const index = this.products.findIndex(p => p.productId === this.currentProductId);
            if (index > -1) {
              this.products[index] = updatedProduct;
            }
            this.resetForm();
            window.alert('Product updated successfully!');
          },
          error => {
            console.error('Error updating product:', error);
            window.alert('Failed to update product. Please try again.');
          }
        );
      } else {

        this.productService.createProduct(product).subscribe(
          (newProduct: Product) => {
            this.products.push(newProduct);
            this.resetForm();
            window.alert('Product added successfully!');
          },
          error => {
            console.error('Error adding product:', error);
            window.alert('Failed to add product. Please try again.');
          }
        );
      }
    }
  }

  onEditProduct(product: Product): void {
    this.isEditMode = true;
    this.currentProductId = product.productId;
    this.productForm.patchValue(product);
  }

  onDeleteProduct(productId: number | null): void {
    if (productId !== null) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirm Deletion',  
          message: 'Deleting this product may result in changes to associated orders. Are you sure you want to delete this product?',
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonColor: 'warn',
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.productService.deleteProduct(productId).subscribe(
            () => {
              this.products = this.products.filter(product => product.productId !== productId);
              window.alert('Product deleted successfully!');
            },
            error => {
              console.error('Error deleting product:', error);
              window.alert('Failed to delete product. Please try again.');
            }
          );
        }
      });
    }
  }
  

  resetForm(): void {
    this.productForm.reset();
    this.isEditMode = false;
    this.currentProductId = null;
  }

  Logout(): void {
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
