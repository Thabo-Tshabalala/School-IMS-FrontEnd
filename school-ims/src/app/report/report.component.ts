import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData, Chart, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/orders.service';
import { ProductService } from '../services/product.service';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { Location } from '@angular/common';
@Component({
  standalone: true,
  imports: [BaseChartDirective, CommonModule,],
  selector: 'app-school-inventory-dashboard',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  recentOrders: Order[] = [];
  mostOrderedProducts: { product: Product; totalOrdered: number }[] = [];
  lowStockProducts: { product: Product; currentStock: number; minThreshold: number }[] = [];
  inStockProducts: { product: Product; currentStock: number; minThreshold: number }[] = []; 
  totalAmountSpent: number = 0; // Add this property to hold the total amount spent
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      }
    },
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Total Ordered',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  constructor(
    private orderService: OrderService,
    private productService: ProductService,private location: Location
  ) {}

  ngOnInit() {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale);
    this.loadRecentOrders();
    this.loadMostOrderedProducts();
    this.loadLowStockProducts();
    this.loadInStockProducts(); 
    this.calculateTotalAmountSpent(); 
  }

  loadRecentOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.recentOrders = orders; 
        this.calculateTotalAmountSpent();
      },
      error: (err) => {
        console.error('Failed to load recent orders:', err);
      }
    });
  }
  

  loadMostOrderedProducts(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders: Order[]) => {
        this.mostOrderedProducts = this.calculateMostOrdered(orders);
        console.log('Most Ordered Products:', this.mostOrderedProducts);
        this.updateChartData();
      },
      error: (err) => {
        console.error('Failed to load most ordered products:', err);
      }
    });
  }

  loadLowStockProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.lowStockProducts = products
          .filter(product => (product.stockQuantity ?? 0) < 5) 
          .map(product => ({
            product,
            currentStock: product.stockQuantity !== null ? product.stockQuantity : 0, 
            minThreshold: 5 
          }));
        console.log('Low Stock Products:', this.lowStockProducts); 
      },
      error: (err) => {
        console.error('Failed to load low stock products:', err);
      }
    });
  }
  
  loadInStockProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.inStockProducts = products
          .filter(product => (product.stockQuantity ?? 0) >= 5) 
          .map(product => ({
            product,
            currentStock: product.stockQuantity ?? 0, 
            minThreshold: 5 
          }));
        console.log('In Stock Products:', this.inStockProducts); 
      },
      error: (err) => {
        console.error('Failed to load in-stock products:', err);
      }
    });
  }
  
  calculateMostOrdered(orders: Order[]): { product: Product; totalOrdered: number }[] {
    const productCounts: { [key: number]: number } = {};

    orders.forEach(order => {
      if (order.product && order.product.productId) {
        const productId = order.product.productId;
        productCounts[productId] = (productCounts[productId] || 0) + (order.quantity || 0);
      } else {
        console.warn(`Order does not have a valid product:`, order);
      }
    });

    const mostOrdered = Object.entries(productCounts).map(([productIdStr, totalOrdered]) => {
      const productId = Number(productIdStr);
      const order = orders.find(o => o.product && o.product.productId === productId);

      if (!order) {
        console.warn(`Order not found for product id: ${productId}`);
        return null; 
      }

      return {
        product: order.product,
        totalOrdered: totalOrdered,
      };
    }).filter((item): item is { product: Product; totalOrdered: number } => item !== null);

    mostOrdered.sort((a, b) => b.totalOrdered - a.totalOrdered);

    return mostOrdered;
  }

  updateChartData(): void {
    this.barChartData.labels = this.mostOrderedProducts.map(item => item.product.name);
    this.barChartData.datasets[0].data = this.mostOrderedProducts.map(item => item.totalOrdered);
    console.log('Updated Chart Data:', this.barChartData);
  }

  calculateTotalAmountSpent(): void {
    this.totalAmountSpent = this.recentOrders.reduce((total, order) => {
     
      const productPrice = order.product?.price ?? 0;
      return total + (productPrice * (order.quantity ?? 0)); 
    }, 0);
  }

  goBack(): void {
    this.location.back();
  }
}
