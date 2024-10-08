import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { OrdersTableComponent } from '../orders-table/orders-table.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../layout/layout.component';
import { OrderService } from '../../services/order.service';
import { OrderCreateComponent } from '../order-create-dropdown/orders-create-dropdown.component';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterLink, OrdersTableComponent, ButtonModule, CommonModule, LayoutComponent, OrderCreateComponent, RouterLink],
  providers: [OrderService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  constructor(private router: Router) { }

  isCreatingOrder = false;

  ngOnInit(): void {
    this.isCreatingOrder = false;
  }

  toggleCreateOrder(): void {
    this.isCreatingOrder = !this.isCreatingOrder;
  }

  createOrder() {
    this.router.navigate(['orders/create-new']);
  }
}
