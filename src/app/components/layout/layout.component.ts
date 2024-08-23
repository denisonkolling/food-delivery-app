import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(
    private sidebarService: SidebarService
  ) { }

  isSidebarVisible: boolean = true;

  ngOnInit() {
    this.sidebarService.sidebarVisible$.subscribe(
      isVisible => this.isSidebarVisible = isVisible
    );
  }

}
