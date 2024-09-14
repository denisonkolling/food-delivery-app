import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { REGEX } from '../../shared/constants/regex.constants';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, InputTextModule, ReactiveFormsModule, ButtonModule, CommonModule, RouterModule],
  providers: [AuthService, TokenService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {
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


  loginUser() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          if (response && response.access_token) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
            this.router.navigate(['/home']);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email or password is wrong' });
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Form is invalid' });
    }
  }
}

