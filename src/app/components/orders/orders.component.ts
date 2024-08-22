import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OrdersTableComponent } from '../orders-table/orders-table.component';
import { OrdersCreateComponent } from '../orders-create/orders-create.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterLink, OrdersTableComponent, OrdersCreateComponent, ButtonModule, CommonModule, LayoutComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  isCreatingOrder = false;

  ngOnInit(): void {
    this.isCreatingOrder = false;
  }

  toggleCreateOrder(): void {
    this.isCreatingOrder = !this.isCreatingOrder;
  }

}
