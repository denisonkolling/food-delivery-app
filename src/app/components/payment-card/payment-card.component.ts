import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule, FormsModule, ReactiveFormsModule, InputTextModule, CalendarModule],
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss']
})

export class PaymentCardComponent {

  selectedPaymentMethod: string = 'card';

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  handleSubmit() {
    // Lógica para enviar o formulário
  }

  getCreditCardForm() {
    return this.selectedPaymentMethod === 'card';
  }

  getPaypalForm() {
    return this.selectedPaymentMethod === 'paypal';
  }

  getBankForm() {
    return this.selectedPaymentMethod === 'bank';
  }
}
