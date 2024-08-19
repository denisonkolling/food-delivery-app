import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthService } from '../../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, ButtonModule],
  providers: [SplitButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  constructor(
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logoutUser();
  }
}
