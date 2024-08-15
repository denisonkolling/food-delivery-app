import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { REGEX } from '../../shared/constants/regex.constants';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CardModule, InputTextModule, ReactiveFormsModule, ButtonModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private messageService: MessageService, private router: Router) {
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

  submitDetails() {
    const postData = { ...this.registerForm.value }
    delete postData.confirmPassword;

    this.authService.registerUser(postData as User).subscribe(
      response => {
        console.log(response),
          this.messageService.add({ severity: 'sucess', summary: 'Sucess', detail: 'Register Sucessfully' })
        this.router.navigate(['login']);
      },
      error => {
        console.log(error),
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' })
      }

    )
  }

}
