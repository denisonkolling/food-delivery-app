import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { HeaderComponent } from '../layout/header/header.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { LayoutComponent } from '../layout/layout.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { PaymentCardComponent } from '../payment-card/payment-card.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { PasswordFormComponent } from '../password-form/password-form.component';
import { ProfileSettingsCardComponent } from '../profile-settings-card/profile-settings-card.component';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CardModule, CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, HeaderComponent, SidebarComponent, LayoutComponent, ProfileCardComponent, PaymentCardComponent, ProfileFormComponent, PasswordFormComponent, ProfileSettingsCardComponent],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent {

}
