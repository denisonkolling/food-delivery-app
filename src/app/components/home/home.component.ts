import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../layout/header/header.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, HeaderComponent, SidebarComponent, FooterComponent, RouterOutlet, LayoutComponent],
  providers: [AuthService, TokenService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
  }

}
