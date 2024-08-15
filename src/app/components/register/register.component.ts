import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { REGEX } from '../../shared/constants/regex.constants';
import { passwordMatchValidator } from '../../shared/password-match.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CardModule, InputTextModule, ReactiveFormsModule, ButtonModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', [
        Validators.required,
        Validators.pattern(REGEX.NAME)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(REGEX.EMAIL)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(REGEX.PASSWORD)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.pattern(REGEX.PASSWORD)
      ]]
    }, { validators: passwordMatchValidator });
  }


  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() { return this.registerForm.controls['password']; }

  get confirmPassword() { return this.registerForm.controls['confirmPassword']; }

}
