import { OrderService } from '../../services/order.service';
import { CardModule } from 'primeng/card';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { REGEX } from '../../shared/constants/regex.constants';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-orders-create',
  standalone: true,
  imports: [CardModule, CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  providers: [OrderService],
  templateUrl: './orders-create.component.html',
  styleUrl: './orders-create.component.css'
})

export class OrdersCreateComponent {

  orderForm!: FormGroup;

  constructor(private orderService: OrderService, private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      address: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      console.log('Form submitted:', this.orderForm.value);
    }
  }

  get name() {
    return this.orderForm.controls['name'];
  }

  get email() {
    return this.orderForm.controls['email'];
  }

  get address() {
    return this.orderForm.controls['address'];
  }

  get quantity() {
    return this.orderForm.controls['quantity'];
  }

}
