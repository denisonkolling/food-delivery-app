import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { REGEX } from '../../shared/constants/regex.constants';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [CommonModule, CardModule, ReactiveFormsModule, ButtonModule, InputTextModule, CalendarModule],
  templateUrl: './driver-form.component.html',
  styleUrl: './driver-form.component.css'
})
export class DriverFormComponent {


  driverForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.driverForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationality: ['', Validators.required],
      bithdate: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      licenseExpiryDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      address: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.driverForm.valid) {
      console.log('Form submitted:', this.driverForm.value);
    }
  }

  get firstName() {
    return this.driverForm.controls['firstName'];
  }

  get lastName() {
    return this.driverForm.controls['lastName'];
  }

  get email() {
    return this.driverForm.controls['email'];
  }

  get address() {
    return this.driverForm.controls['address'];
  }

  get quantity() {
    return this.driverForm.controls['quantity'];
  }

  get nationality() {
    return this.driverForm.controls['nationality'];
  }

  get licenseExpiryDate() {
    return this.driverForm.controls['licenseExpiryDate'];
  }

  get licenseNumber() {
    return this.driverForm.controls['licenseNumber'];
  }

  get birthdate() {
    return this.driverForm.controls['birthdate'];
  }

  resetForm() {
    this.driverForm.reset();
  }

}
