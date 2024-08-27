import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { REGEX } from '../../shared/constants/regex.constants';
import { HeaderComponent } from '../layout/header/header.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { LayoutComponent } from '../layout/layout.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { PaymentCardComponent } from '../payment-card/payment-card.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CardModule, CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, HeaderComponent, SidebarComponent, LayoutComponent, ProfileCardComponent, PaymentCardComponent, ProfileFormComponent],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent {

  passwordForm: FormGroup;

  formChangePassword: boolean = false

  formEditProfile: boolean = true

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]],
      passwordConfirm: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]],
    });
  }

  btnShowFormChangePassword() {
    this.formChangePassword = true
    this.formEditProfile = false
  }
  btnShowFormEditProfile() {
    this.formEditProfile = true
    this.formChangePassword = false
  }

  onSubmitPasswordChange() {
    throw new Error('Method not implemented.');
  }

  get password() {
    return this.passwordForm.controls['password'];
  }

  get confirmPassword() {
    return this.passwordForm.controls['passwordConfirm'];
  }

}
