import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private sidebarService: SidebarService) { }

  items: any[] = [];

  isVisible: boolean = true;

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        items: [
          { label: 'Overview', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/dashboard/overview'] },
          { label: 'Statistics', icon: 'pi pi-fw pi-chart-line', routerLink: ['/dashboard/statistics'] }
        ]
      },
      {
        label: 'Orders',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          { label: 'All Orders', icon: 'pi pi-fw pi-list', routerLink: ['/orders'] },
          { label: 'Pending Orders', icon: 'pi pi-fw pi-clock', routerLink: ['/orders/pending'] },
          { label: 'Completed Orders', icon: 'pi pi-fw pi-check', routerLink: ['/orders/completed'] },
          { label: 'Cancelled Orders', icon: 'pi pi-fw pi-times', routerLink: ['/orders/cancelled'] }
        ]
      },
      {
        label: 'Products',
        icon: 'pi pi-fw pi-tags',
        items: [
          { label: 'All Products', icon: 'pi pi-fw pi-list', routerLink: ['/products/all'] },
          { label: 'Add New Product', icon: 'pi pi-fw pi-plus', routerLink: ['/products/new'] },
          { label: 'Categories', icon: 'pi pi-fw pi-th-large', routerLink: ['/products/categories'] }
        ]
      },
      {
        label: 'Restaurants',
        icon: 'pi pi-fw pi-building',
        items: [
          { label: 'All Restaurants', icon: 'pi pi-fw pi-list', routerLink: ['/restaurants/all'] },
          { label: 'Add New Restaurant', icon: 'pi pi-fw pi-plus', routerLink: ['/restaurants/new'] },
          { label: 'Manage Reviews', icon: 'pi pi-fw pi-comments', routerLink: ['/restaurants/reviews'] }
        ]
      },
      {
        label: 'Drivers',
        icon: 'pi pi-fw pi-id-card',
        items: [
          { label: 'All Drivers', icon: 'pi pi-fw pi-list', routerLink: ['/drivers/all'] },
          { label: 'Add New Driver', icon: 'pi pi-fw pi-plus', routerLink: ['/drivers/new'] },
          { label: 'Driver Ratings', icon: 'pi pi-fw pi-star', routerLink: ['/drivers/ratings'] }
        ]
      },
      {
        label: 'Vehicles',
        icon: 'pi pi-fw pi-truck',
        items: [
          { label: 'All Vehicles', icon: 'pi pi-fw pi-list', routerLink: ['/vehicles/all'] },
          { label: 'Add New Vehicle', icon: 'pi pi-fw pi-plus', routerLink: ['/vehicles/new'] },
          { label: 'Vehicle Maintenance', icon: 'pi pi-fw pi-wrench', routerLink: ['/vehicles/maintenance'] }
        ]
      },
      {
        label: 'Locations',
        icon: 'pi pi-fw pi-map-marker',
        items: [
          { label: 'Delivery Zones', icon: 'pi pi-fw pi-globe', routerLink: ['/locations/zones'] },
          { label: 'Addresses', icon: 'pi pi-fw pi-map', routerLink: ['/locations/addresses'] }
        ]
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        items: [
          { label: 'Account Settings', icon: 'pi pi-fw pi-user-edit', routerLink: ['/settings/account'] },
          { label: 'Preferences', icon: 'pi pi-fw pi-sliders-h', routerLink: ['/settings/preferences'] }
        ]
      }
    ];

    this.sidebarService.sidebarVisible$.subscribe(
      isVisible => this.isVisible = isVisible
    );

  }

}

