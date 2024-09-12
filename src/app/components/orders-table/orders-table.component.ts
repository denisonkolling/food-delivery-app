import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [TableModule, CommonModule, CardModule, ButtonModule, RouterLink, CapitalizePipe],
  providers: [OrderService],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.css'
})
export class OrdersTableComponent implements OnInit {

  orders: Order[] = [];

  filteredOrders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.orderService.findAllOrders().subscribe({
      next: (data) => {
        if (data) {
          this.orders = this.processOrders(data);
          this.applyFilterFromRoute();
        } else {
          console.error('No data received');
        }
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });

    this.route.paramMap.subscribe(() => {
      this.applyFilterFromRoute();
    });
  }


  private processOrders(orders: Order[]): Order[] {
    return orders.map(order => ({
      ...order,
      createdAt: new Date(order.createdAt)
    }));
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'pi pi-check';
      case 'CANCELLED':
        return 'pi pi-times';
      case 'PENDING':
        return 'pi pi-clock';
      default:
        return '';
    }
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-200';
      case 'PENDING':
        return 'bg-yellow-200';
      case 'CANCELLED':
        return 'bg-red-200';
      default:
        return 'status-unknown';
    }
  }

  removeOrder(index: number) {
    if (index >= 0 && index < this.orders.length) {
      this.filteredOrders.splice(index, 1);
    } else {
      console.error('Index out of bounds');
    }
  }

  editOrder(index: number) {
    const order = this.filteredOrders[index];
    this.router.navigate((['/orders/edit', order.id]));
  }

  filterOrdersByStatus(status: string) {
    return this.orders.filter(order => order.status === status.toUpperCase());
  }

  private applyFilterFromRoute() {
    const status = this.route.snapshot.paramMap.get('status');
    if (status) {
      this.filteredOrders = this.filterOrdersByStatus(status);
    } else {
      this.filteredOrders = this.orders;
    }
  }

}