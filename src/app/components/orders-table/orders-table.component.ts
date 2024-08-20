import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import { TableModule } from 'primeng/table';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [TableModule, CommonModule, CardModule, ButtonModule, RouterLink],
  providers: [OrderService],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.css'
})
export class OrdersTableComponent implements OnInit {

  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.findAllOrders().subscribe({
      next: (data) => {
        if (data) {
          this.orders = this.processOrders(data);
        } else {
          console.error('No data received');
        }
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }

  private processOrders(orders: Order[]): Order[] {
    return orders.map(order => ({
      ...order,
      createdAt: new Date(order.createdAt)
    }));
  }
}