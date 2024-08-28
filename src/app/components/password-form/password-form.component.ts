import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { REGEX } from '../../shared/constants/regex.constants';
import { CommonModule } from '@angular/common';
import { InputText, InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-password-form',
  standalone: true,
  imports: [CardModule, ButtonModule, ReactiveFormsModule, CommonModule, InputTextModule],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.css'
})
export class PasswordFormComponent {

  passwordForm: FormGroup;

  formChangePassword: boolean = true;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]],
      passwordConfirm: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]],
    });
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
