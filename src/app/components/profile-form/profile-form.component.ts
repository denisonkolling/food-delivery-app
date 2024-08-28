import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { REGEX } from '../../shared/constants/regex.constants';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Calendar, CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ButtonModule, CardModule, FormsModule, ReactiveFormsModule, CommonModule, InputTextModule, CalendarModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent {

  userForm: FormGroup;

  passwordForm: FormGroup;

  formChangePassword: boolean = false

  formEditProfile: boolean = true

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      address: ['', Validators.required],
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]],
      passwordConfirm: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
    }
  }

  get name() {
    return this.userForm.controls['name'];
  }

  get email() {
    return this.userForm.controls['email'];
  }

  get address() {
    return this.userForm.controls['address'];
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
