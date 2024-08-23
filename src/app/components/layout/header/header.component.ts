import { Component, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthService } from '../../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { SidebarService } from '../../../services/sidebar.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, ButtonModule],
  providers: [SplitButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {


  isSidebarVisible: boolean = true;

  constructor(
    private authService: AuthService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    this.sidebarService.sidebarVisible$.subscribe(
      isVisible => this.isSidebarVisible = isVisible
    );
  }

  logout() {
    this.authService.logoutUser();
  }


  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
