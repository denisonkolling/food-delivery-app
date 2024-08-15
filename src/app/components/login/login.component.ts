import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { REGEX } from '../../shared/constants/regex.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, InputTextModule, ReactiveFormsModule, ButtonModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(REGEX.EMAIL)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(REGEX.PASSWORD)
      ]]
    });
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() { return this.loginForm.controls['password']; }


}
